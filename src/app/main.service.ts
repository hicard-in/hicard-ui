import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { settings } from 'src/configs/settings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class MainService {
  
  constructor(private http: HttpClient) { }

  login(username:string, password:string) {
    return this.http.post(environment.apiUrl+"user/login", {
      username,
      password
    }, {
      headers: {

      }
    })
  }

}
