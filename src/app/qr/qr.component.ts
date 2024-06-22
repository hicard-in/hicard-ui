import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit{

  constructor(
    private mainService: MainService,
    private route:ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {

  }

  profile:any = null;
  isLoggedIn:boolean = false;
  user:any = null;
  defaultDp:string = "https://api.dicebear.com/5.x/bottts/svg?seed=";
  username:any = null

  async ngOnInit() {
    let username = this.route.snapshot.params['id'];
    let localStorageUsername = this.mainService.getUserName();
    
    this.username = username || localStorageUsername

    if(!this.username) {
      this.router.navigate([`/shop`])
      return
    }

    this.mainService.userProfile = null;
    let userProfile = await this.mainService.getProfile(this.username);

    if(userProfile['err']) {
      this.router.navigate([`/shop`])
      return
    }



    this.isLoggedIn = this.mainService.checkLoggedIn();
    this.user = userProfile?.[0]
    this.profile = userProfile?.[0]
    
    this.defaultDp += this.profile?.userId;

    this.titleService.setTitle(this.profile.name)

    console.log(this.profile)
  }


}
