import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MainService } from '../main.service';
import { Title } from "@angular/platform-browser";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(
    public mainService: MainService,
    private titleService: Title,
    private router: Router,
  ) {
    this.profileFG = this.mainService.profileFG
    this.bioFG = this.profileFG.get('bio') as FormGroup
  }

  profileFG:FormGroup;
  bioFG:FormGroup;
  username:string = "";
  defaultDP:string = "https://api.dicebear.com/5.x/bottts/svg?seed="

  profile:any;
  user:any;
  environment = environment


  async ngOnInit() {
    let username = String(localStorage.getItem('username'))
    this.username = username;
    this.mainService.userProfile = null;
    let userProfile = await this.mainService.getProfile(username)
    console.log(userProfile)

    this.profile = userProfile?.[0]
    this.user = userProfile?.[0]
    
    this.defaultDP += this.profile?.userId;

    if(this.user.isActivated === false || this.user.isActivated === null) {
      this.router.navigate([`/setup`, {username: username}])
    }

    this.titleService.setTitle(this.profile.name + ' - Settings')
    console.log(this.profileFG)
    console.log(this.profileFG.value)
  }

  saveProfile() {
    this.mainService.saveProfile()
  }

  uploadProfilePhoto(event:Event, field:any='photo') {
    console.log(this.profile.id)
    this.mainService.uploadProfilePhoto(event, this.profile.id, field)
  }

}
