import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { settings } from 'src/configs/settings';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { defaultProfile } from 'src/configs/profile';


@Injectable({
  providedIn: 'root'
})


export class MainService {

  userProfile:any;
  profileValues:any;
  isSubscribing:boolean = false;
  
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
  }

  login(username:string, password:string) {
    return this.http.post(environment.apiUrl+"user/login", {
      username,
      password
    }, {
      headers: {

      }
    })
  }

  signup(username:string, password:string) {
    let token = String(localStorage.getItem("token"))
    return this.http.put(environment.apiUrl+"user/signup", {
      username,
      password
    }, {
      headers: {
        'api-token': token
      }
    })
  }

  async getProfile(username:string) {
    if(!this.userProfile) {
      let res:any = await this.http.get(environment.apiUrl+"user/"+username).toPromise()
      if(!res.profile?.[0]){
        res.profile[0] = defaultProfile
      }
      this.userProfile = res
      this.profileFG.patchValue(this.userProfile?.profile?.[0])
    }
    // console.log(this.userProfile?.profile?.[0])

    if(!this.isSubscribing) {
      this.profileFG.valueChanges.subscribe((data)=>{
        this.saveProfile();
      })
      this.isSubscribing = true
      this.profileValues = this.profileFG.value;
    }
    return this.userProfile
  }

  
  getLinkFormControlList() {
    return [
      new FormControl(null, {updateOn: 'blur'}),
      new FormControl(null, {updateOn: 'blur'}),
      new FormControl(null, {updateOn: 'blur'}),
      new FormControl(null, {updateOn: 'blur'}),
      new FormControl(null, {updateOn: 'blur'})
    ]

  }

  profileFG: FormGroup = this.fb.group({
    name: ['',  {updateOn: 'blur'}],
    photo: ['',  {updateOn: 'blur'}],
    banner: ['',  {updateOn: 'blur'}],
    bio: this.fb.group({
      title: ['',  {updateOn: 'blur'}],
      work: ['',  {updateOn: 'blur'}],
      education: ['',  {updateOn: 'blur'}],
      location: ['',  {updateOn: 'blur'}]
    }),
    skill: this.fb.array(['',  {updateOn: 'blur'}]),
    contact_info: this.fb.group({
      website: this.fb.array(this.getLinkFormControlList()),
      email: this.fb.array(this.getLinkFormControlList()),
      phone: this.fb.array(this.getLinkFormControlList()),
      whatsapp: this.fb.array(this.getLinkFormControlList()),
      discord: this.fb.array(this.getLinkFormControlList()),
      telegram: this.fb.array(this.getLinkFormControlList())
    }),

    social_links: this.fb.group({
      linkedIn: this.fb.array(this.getLinkFormControlList()),
      instagram: this.fb.array(this.getLinkFormControlList()),
      twitter: this.fb.array(this.getLinkFormControlList()),
      facebook: this.fb.array(this.getLinkFormControlList()),
      youtube: this.fb.array(this.getLinkFormControlList()),
      snapchat: this.fb.array(this.getLinkFormControlList())
    }),

    payment: this.fb.group({
      paypal: this.fb.array(this.getLinkFormControlList()),
      gpay: this.fb.array(this.getLinkFormControlList()),
      upi: this.fb.array(this.getLinkFormControlList())
    }),

    productivity: this.fb.group({
      calendly: this.fb.array(this.getLinkFormControlList()),
      notion: this.fb.array(this.getLinkFormControlList()),
      gdrive: this.fb.array(this.getLinkFormControlList())
    }),



  })

  getProfileFG() {
    return this.profileFG
  }

  saveProfile() {
    if(JSON.stringify(this.profileFG.value) === JSON.stringify(this.profileValues)) {

    } else {
      this.updateProfile(this.profileFG.value)
    }
  }

  async updateProfile(profileValue:any) {
    let token = String(localStorage.getItem('token'))
    this.http.put(environment.apiUrl+"profile", profileValue, {
      headers: {
        'api-token': token
      }
    }).subscribe((data)=> {
      console.log(data)
    })
  }

  checkLoggedIn() {
    let token = localStorage.getItem("token")
    if(token) {
      return true;
    }
    return false;
  }

  getUserName() : String | null {
    let username = localStorage.getItem('username')
    if(username) {
      return String(username)
    }
    return null
  }

}
