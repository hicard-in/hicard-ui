import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MainService } from '../main.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(private mainService: MainService) {
    this.profileFG = this.mainService.profileFG
    this.bioFG = this.profileFG.get('bio') as FormGroup
  }

  profileFG:FormGroup;
  bioFG:FormGroup;
  username:string = "";

  profile:any;
  user:any;

  profilePhotoFG: FormGroup = new FormGroup({
    photo: new FormControl('')
  })

  async ngOnInit() {
    let username = String(localStorage.getItem('username'))
    this.username = username;
    let userProfile = await this.mainService.getProfile(username)
    console.log(userProfile)

    this.profile = userProfile?.profile?.[0]
    this.user = userProfile?.user?.[0]

    // console.log(this.profileFG)
  }

  saveProfile() {
    this.mainService.saveProfile()
  }

  uploadProfilePhoto(file:any) {

  }

}
