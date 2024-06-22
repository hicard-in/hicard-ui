import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  isLoading:boolean = false;
  error:any = null;

  loginFG: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  login() {
    this.isLoading = true
    let username = this.loginFG.value.username
    let password = this.loginFG.value.password


    if(!this.loginFG.valid) {
      this.error = "All fields are mandatory"
      this.isLoading = false
      return
    }



    this.mainService.login(username, password).subscribe((data:any) => {
      console.log(data)
      if(data.err) {
        this.error = data.message
      } else {
        if(data.user.isActivated) {
          this.error = null;
          localStorage.setItem("token", data.jwt)
          localStorage.setItem("username", username)
          this.router.navigate([`/${username}`])
        } else {
          this.router.navigate([`/setup`])
        }
      }
      this.isLoading = false
    }, (err)=>{
      if(err.error.error.status === 400) {
        this.isLoading = false;
        this.error = err.error.error.message.replace("identifier", "username")
      }
    })

  }

  signUpWithGoogle() {
    this.mainService.signUpWithGoogle()
  }

}
