import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    console.log(this.profile)
    let allLink = {...this.profile.contact_info, ...this.profile.social_links, ...this.profile.payment, ...this.profile.productivity}

    for (const link in allLink) {
      allLink[link].forEach((e: any) => {
        this.linksList.push(e)
      });
    }
  }

}
