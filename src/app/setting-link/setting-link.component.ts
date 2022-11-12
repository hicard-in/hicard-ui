import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { settings } from 'src/configs/settings';
import { MainService } from '../main.service';

@Component({
  selector: 'app-setting-link',
  templateUrl: './setting-link.component.html',
  styleUrls: ['./setting-link.component.scss']
})
export class SettingLinkComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private route:ActivatedRoute,
    private router: Router
  ) { 
    this.category = this.route.snapshot.params['category'];
    this.linkType = this.route.snapshot.params['id'];
    this.profileFG = this.mainService.profileFG
    this.sectionFG = this.profileFG.get(this.category) as FormGroup
    this.linkFG = this.profileFG.get(this.category+'.'+this.linkType) as FormArray
    this.setting = settings
    this.theLimit = 1
  }

  profileFG:FormGroup
  sectionFG:FormGroup
  linkFG:FormArray

  category:string
  linkType:string

  setting:any;
  theLimit:number;

  async ngOnInit() {
    let username = String(localStorage.getItem('username'))
    let userProfile = await this.mainService.getProfile(username)
  }

  addAnother() {
    if(this.linkFG.at(this.theLimit - 1).value) {
      this.theLimit++;
    }
  }

  deleteLink(index:any) {
    this.linkFG.at(index).setValue(null)
  }

  followLink(index:any) {
    let theLink = this.linkFG.at(index).value
    this.mainService.followLink(this.linkType, theLink)
  }

}
