import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { settings } from 'src/configs/settings';

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

  async ngOnInit() {
    let username = this.route.snapshot.params['id'];
    let userProfile = await this.mainService.getProfile(username);

    this.user = userProfile?.user?.[0]
    this.profile = userProfile?.profile?.[0]

    if(!this.profile && !this.user) {
      this.router.navigate([`/login`])
    }

    if(this.user.isActivated === false) {
      this.router.navigate([`/setup`])
    }

    // console.log(this.user)
    this.flattenList()
  }

  flattenList() {
    // console.log(this.profile)
    let allLink = {...this.profile.contact_info, ...this.profile.social_links, ...this.profile.payment, ...this.profile.productivity}

    let categories = ['contact_info', 'social_links', 'payment', 'productivity']

    categories.forEach((category) =>{
      Object.keys(this.profile[category]).forEach((linkType:any)=>{
        let linkarr = this.profile[category][linkType]
        linkarr.forEach((theLink:any)=>{
          if(theLink) {
            let linkObj = this.setting[category][linkType]
            linkObj['link'] = theLink
            this.linksList.push(linkObj)
            console.log(linkObj)
          }
        })
        // console.log(linkarr)
      })
      // console.log(this.profile[category])
    })

    // for (const link in allLink) {
    //   console.log(link)
    //   allLink[link].forEach((e: any) => {
    //     this.linksList.push(e)
    //     if(e) {
    //       console.log(e)
    //     }
    //   });
    // }
  }

}
