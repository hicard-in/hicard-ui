import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { defaultProfile } from 'src/configs/profile';
import { debounceTime, distinctUntilChanged, lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class MainService {

  userProfile:any;
  profileValues:any;
  isSubscribing:boolean = false;
  isUploadingPhoto:boolean = false;
  isSavingData:boolean = false;
  apiUrl:string = '';
  
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    this.apiUrl = environment.apiUrl || window.location.origin.replace(window.location.host, `api.${window.location.host}/`)
  }
  

  login(username:string, password:string) {
    return this.http.post(this.apiUrl+"api/auth/local/", {
      identifier: username,
      password
    }, {
      headers: {

      }
    })
  }

  signup(username:string, password:string) {
    let token = String(localStorage.getItem("token"))
    return this.http.put(this.apiUrl+"api/user/me", {
      username,
      password,
      isActivated: true
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  async getProfile(username:string, updating:boolean = false) {
    if(!this.userProfile || updating) {

      let res:any = {}
      try {
        if(updating) {
          res = await this.http.get(`${this.apiUrl}api/users/?filters[$or][0][username][$eq]=${username}&filters[$or][1][userId][$eq]=${username}&populate=deep`).toPromise()
        } else {
          res = await this.http.get(`https://bucket.hicard.in/api/${username}.json?random=${Math.random() * 1000}`).toPromise()
        }
      } catch (error:any) {
        if(error.status === 404) {
          res['err'] = error
        }
      }

      if(res.err) {
        return res
      }
      
      if(!res[0]){
        res[0] = defaultProfile
      }
      this.userProfile = res
      this.profileFG.patchValue(this.userProfile?.[0])
    }
    // console.log(this.userProfile?.profile?.[0])

    if(!this.isSubscribing) {
      this.profileFG.valueChanges
      .pipe(debounceTime(1500))
      .pipe(distinctUntilChanged())
      .subscribe((data)=>{
        this.isSavingData = true;
        this.saveProfile();
      })
      this.isSubscribing = true
      this.profileValues = this.profileFG.value;
    }
    return this.userProfile
  }

  
  getLinkFormControlList() {
    return [
      this.fb.group({
        
        value: ['']
      }),
      this.fb.group({
        
        value: ['']
      }),
      this.fb.group({
        
        value: ['']
      }),
      this.fb.group({
        
        value: ['']
      }),
      this.fb.group({
        
        value: ['']
      })
    ]

  }

  profileFG: FormGroup = this.fb.group({
    name: [''],
    photo: [''],
    banner: [''],
    bio: this.fb.group({
      title: [''],
      work: [''],
      education: [''],
      location: [''],
      skill: ['']
    }),
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
      this.isSavingData = false;
    } else {
      let toSaveObj = this.sanitizeObj(this.profileFG.value)
      this.updateProfile(toSaveObj)
    }
  }

  async updateProfile(profileValue:any) {
    let token = String(localStorage.getItem('token'))
    this.http.put(this.apiUrl+"api/user/me", profileValue, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe((data)=> {
      console.log(data)
      this.isSavingData = false;
    })
  }

  sanitizeObj(profile:any) {
    let categories = ['contact_info', 'social_links', 'payment', 'productivity']

    categories.forEach((category) =>{
      if(!profile[category]) {
        return
      }
      Object.keys(profile[category]).filter(e => e!='id').forEach((linkType:any)=>{
        let linkarr = profile[category][linkType]
        profile[category][linkType] = linkarr.filter((el:any) => {
          return el.value != ''
        })
      })
    })

    return profile
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

  uploadProfilePhoto(event: Event, userId:any, field:any='photo') {
    this.isUploadingPhoto = true;
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let token = String(localStorage.getItem('token'))
      let file = fileList[0]
      var fd = new FormData();
      fd.append('files', file);
      fd.append('refId', userId);
      fd.append('ref', 'plugin::users-permissions.user');
      fd.append('field', field);
      this.http.post(this.apiUrl+"api/upload", fd, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
      }).subscribe(async (data)=>{
        this.userProfile = null
        let username = String(localStorage.getItem('username'))
        await this.getProfile(username, true)
        await this.saveProfile()
        console.log(data)
        this.isUploadingPhoto = false
      })
    }
  }

  followLink(linkType:string, theLink:string) {

    if(!theLink){
      return
    }
    
    theLink = theLink.trim()
    switch (linkType) {
      case 'email':
        if (!/^mailto?:/.test(theLink)) {
          theLink = 'mailto:' + theLink
        }
        window.open(theLink, "_blank");
        break

      case 'phone':
        if (/^\d{10}$/.test(theLink)) {
          theLink = 'tel:+91' + theLink
        } else if (/^\d{12}$/.test(theLink)) {
          theLink = 'tel:+' + theLink
        } else {
          break
        }
        
        window.open(theLink, "_blank");
        break
      
      case 'whatsapp':
        if (/^\d{10}$/.test(theLink)) {
          theLink = 'https://wa.me/91' + theLink + '?text=Hi'
        } else if (/^\d{12}$/.test(theLink)) {
          theLink = 'https://wa.me/' + theLink + '?text=Hi'
        } else {
          break
        }
        
        window.open(theLink, "_blank");
        break
      
      case 'upi':
      case 'gpay':
        if (/[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/.test(theLink)) {
          theLink = 'upi://pay?pa=' + theLink + `&pn=abc`
        } else {
          break
        }
        
        window.open(theLink, "_blank");
        break
      
      case 'instagram':
        this.userNameFollowLink("instagram", "https://www.instagram.com/", theLink);
        break
      
      case 'linkedIn':
        this.userNameFollowLink("linkedin", "https://www.linkedin.com/in/", theLink);
        break
      
      case 'twitter': 
        this.userNameFollowLink("twitter", "https://twitter.com/", theLink);
        break

      default:
        if (!/^http[s]?:\/\//.test(theLink)) {
          theLink = 'http://' + theLink
        }
        window.open(theLink, "_blank");
        break;
    }
  }

  defaultFollowLink(theLink:any) {
    if (!/^http[s]?:\/\//.test(theLink)) {
      theLink = 'http://' + theLink
    }
    window.open(theLink, "_blank");
  }
  
  userNameFollowLink(domain:string, baseUrl:string, theLink:string) {
    if(!theLink.includes("/") && !theLink.includes(domain) && !theLink.includes(".com")) {
      let igLink = baseUrl+theLink
      window.open(igLink, "_blank");
    } else {
      this.defaultFollowLink(theLink);
    }

  }

  signUpNow(email: string) {
    let url = `${this.apiUrl}/api/signup`
    return this.http.post(url, {
      email
    })
  }

  signUpWithGoogle() {
    let url = `${this.apiUrl}/api/connect/google`
    // window.open(url, '_blank')
    window.location.href = url;
  }

  async convertTokenWithJqtGoogle(query:any) {
    let url = `${this.apiUrl}/api/auth/google/callback?${query}`
    let response = await this.getWithPromise(url)
    return response
  }

  getWithPromise(url:string) {
    return new Promise((resolve, reject)=>{
      this.http.get(url).subscribe((data:any)=>{
        let jwt = data?.jwt
        let username = data?.user?.username
        if(jwt && username) {
          console.log(jwt, username)
          localStorage.setItem("token", jwt)
          localStorage.setItem("username", String(username))
          resolve(true)
        } else {
          reject(false)
        }
      })
    })
  }

}
