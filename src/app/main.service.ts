import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { settings } from 'src/configs/settings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class MainService {

  userProfile:any;
  
  constructor(private http: HttpClient) {
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
      this.userProfile = res
    }
    return this.userProfile
  }

}
