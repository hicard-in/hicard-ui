import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { settings } from 'src/configs/settings';
import { VCardFormatter, VCard } from "ngx-vcard";
import { Title } from "@angular/platform-browser";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private route:ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  profile:any = null
  user:any = null

  linksList:any = [];
  setting:any = settings;
  isLoggedIn:boolean = false;
  defaultDp:string = "https://api.dicebear.com/5.x/bottts/svg?seed=";

  profilePic:any = "";
  public vCard: VCard = {}
  environment = environment;

  showEdit:boolean = false;

  async ngOnInit() {
    let username = this.route.snapshot.params['id'];
    let localStorageUsername = this.mainService.getUserName();
    this.showEdit = username == localStorageUsername;
    this.mainService.userProfile = null;
    let userProfile = await this.mainService.getProfile(username);

    this.isLoggedIn = this.mainService.checkLoggedIn();
    this.user = userProfile?.[0]
    this.profile = userProfile?.[0]
    
    this.defaultDp += this.profile?.userId;

    if(this.profile?.username && this.profile?.username != username) {
      this.router.navigate([`/${this.profile.username}`])
      this.ngOnInit()
      return
    }
    
    if(!this.profile?.userId) {
      this.router.navigate([`/shop`])
      return
    }

    if(this.user.isActivated === false || this.user.isActivated === null) {
      this.router.navigate([`/setup`, {username: username}])
    }
    // console.log(this.user)
    this.flattenList()
    if(this.profile?.photo?.url) {
      this.profilePic = await this.toDataURL(this.profile.photo.url);
      this.profilePic = ';ENCODING=b;type=JPEG:'+ this.profilePic.split(",")[1]
    }

    this.titleService.setTitle(this.profile.name)

  }

  flattenList() {

    let categories = ['contact_info', 'social_links', 'payment', 'productivity']

    categories.forEach((category) =>{
      if(!this.profile[category]) {
        return
      }
      Object.keys(this.profile[category]).filter(e => e!='id').forEach((linkType:any)=>{
        let linkarr = this.profile[category][linkType]
        linkarr.forEach((theLink:any)=>{
          if(theLink) {
            let linkObj = JSON.parse(JSON.stringify(this.setting[category][linkType]))
            linkObj['link'] = theLink?.value
            linkObj['linkType'] = linkType
            this.linksList.push(linkObj)
          }
        })
      })
    })
  }

  followLink(linkType:string, theLink:string) {
    this.mainService.followLink(linkType, theLink)
  }

  public generateVCardOnTheFly = () => {
    let firstName = this.profile.name.split(" ")[0]
    let lastName = this.profile.name.split(" ")?.[1] ? this.profile.name.split(" ")?.[1] : ''

    let emailList: string[] = [];
    let telephone: string[] = [];
    let url:string = "";

    this.profile?.contact_info?.email?.forEach((em:any) => {
      if(em){
        emailList.push(em.value)
      }
    });

    this.profile?.contact_info?.phone?.forEach((em:any) => {
      if(em){
        telephone.push(em.value)
      }
    });

    this.profile?.contact_info?.website?.forEach((em:any) => {
      if(em && url == "") {
        url = em.value
      }
    })
    

    this.vCard =  {
      name: { firstNames: firstName, lastNames: lastName },
      email: emailList,
      telephone,
      title: this.profile.bio.title,
      logo: this.profile.photo,
      photo: this.profilePic,
      organization: this.profile.bio.work,
      url
    };

    let vCardString = VCardFormatter.getVCardAsString(this.vCard);
    vCardString = vCardString.replace('PHOTO:', 'PHOTO')
    this.downloacVCFCard(vCardString);
  };

  downloacVCFCard(vcfString:string) {
    const a = document.createElement('a');
    const blob = new Blob([vcfString], {
      type: "text/vcard",
    });
    a.href = URL.createObjectURL(blob);
    a.download = `${this.profile.name}.vcf`;
    a.click();
  }

  async toDataURL(url:string) {
    var res = await fetch(url);
    var blob = await res.blob();

    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
    return result
  };

  showQR() {
    this.router.navigate([`/qr/${this.profile.username}`])
  }

}
