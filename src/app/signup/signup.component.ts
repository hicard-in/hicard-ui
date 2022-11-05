import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  signupFG: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    repassword: ['', Validators.required]
  })
  
  error:any = null;
  ngOnInit(): void {
  }

  signup() {

    if(!this.signupFG.valid) {
      this.error = "All fields are mandatory"
      return
    }

    let username = this.signupFG.value.username
    let password = this.signupFG.value.password
    let repassword = this.signupFG.value.repassword
    
    if(password != repassword) {
      this.error = "Password do not match"
      return
    }

    this.mainService.signup(username, password).subscribe((data:any)=>{
      this.error = null
      if(data.err) {
        this.error = data.message
      } else {
        this.router.navigate([`/${username}`])
      }
    })


  }

}
