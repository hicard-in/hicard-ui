import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }
  
  error = null;

  loginFG: FormGroup = this.fb.group({
    username: [''],
    password: ['']
  })

  login() {
    let username = this.loginFG.value.username
    let password = this.loginFG.value.password
    this.mainService.login(username, password).subscribe((data:any) => {
      if(data.err) {
        this.error = data.message
      } else {
        this.error = null;
        localStorage.setItem("token", data.key)
      }
    })

  }

}
