import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { settings } from 'src/configs/settings';
import { VCard } from "ngx-vcard";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private route:ActivatedRoute,
    private router: Router
  ) { }

  profile:any = null
  user:any = null

  linksList:any = [];
  setting:any = settings;
  isLoggedIn:boolean = false;
  defaultDp:string = "/assets/default-profile.jpg";

  async ngOnInit() {
    let username = this.route.snapshot.params['id'];
    let userProfile = await this.mainService.getProfile(username);

    if(userProfile.err) {
      this.router.navigate([`/${userProfile.username}`])
      this.ngOnInit()
      return
    }

    this.isLoggedIn = this.mainService.checkLoggedIn();
    this.user = userProfile?.user?.[0]
    this.profile = userProfile?.profile?.[0]

    if(!this.profile && !this.user) {
      this.router.navigate([`/login`])
      return
    }

    if(this.user.isActivated === false) {
      this.router.navigate([`/setup`, {username: username}])
    }

    // console.log(this.user)
    this.flattenList()
  }

  flattenList() {

    let categories = ['contact_info', 'social_links', 'payment', 'productivity']

    categories.forEach((category) =>{
      Object.keys(this.profile[category]).forEach((linkType:any)=>{
        let linkarr = this.profile[category][linkType]
        linkarr.forEach((theLink:any)=>{
          if(theLink) {
            let linkObj = this.setting[category][linkType]
            linkObj['link'] = theLink
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

  public generateVCardOnTheFly = (): VCard => {
    console.log(this.profile)
    let firstName = this.profile.name.split(" ")[0]
    let lastName = this.profile.name.split(" ")?.[1] ? this.profile.name.split(" ")?.[1] : ''

    let emailList: string[] = [];
    let telephone: string[] = [];
    let url:string = "";

    this.profile.contact_info.email.forEach((em:string | null) => {
      if(em){
        console.log(em)
        emailList.push(em)
      }
    });

    this.profile.contact_info.phone.forEach((em:string | null) => {
      if(em){
        console.log(em)
        telephone.push(em)
      }
    });

    this.profile.contact_info.website.forEach((em:string | null) => {
      if(em && url != "") {
        url = em
      }
    })
    

    this.profile
    // TODO: Generate the VCard before Download
    return {
      name: { firstNames: firstName, lastNames: lastName },
      email: emailList,
      telephone,
      title: this.profile.bio.title,
      logo: this.profile.photo,
      organization: this.profile.bio.work,
      url
    };
  };

}
