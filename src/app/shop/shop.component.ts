import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { MainService } from '../main.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private mainService: MainService
  ) {
    // window.location.href = "https://hicard.in"
  }

  error = {
    display: false,
    message: ""
  }

  shopFG: FormGroup = this.fb.group({
    name: ['', Validators.required],
    type: ['std', Validators.required],
    cardText: [''],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    pincode: ['', Validators.required],
    address: ['', Validators.required],
    quantity: ['1', Validators.required]
  })

  signUpFG: FormGroup = this.fb.group({
    email: ['', Validators.email], 
  })

  ngOnInit(): void {
    // window.location.href = "https://hicard.in"
  }

  getCost() {
    if(!parseInt(this.shopFG.get('quantity')?.value)) {
      return 0
    }
    if(this.shopFG.get('type')?.value === 'std') {
      return parseInt(this.shopFG.get('quantity')?.value) * 199;
    } else {
      return parseInt(this.shopFG.get('quantity')?.value) * 299;
    }
  }

  costPlus() {
    if(!parseInt(this.shopFG.get('quantity')?.value)) {
      this.shopFG.get('quantity')?.setValue(1)
      return
    }
    this.shopFG.get('quantity')?.setValue(parseInt(this.shopFG.get('quantity')?.value) + 1)
  }

  costMinus() {
    if(parseInt(this.shopFG.get('quantity')?.value) <= 1) {
      return
    }
    this.shopFG.get('quantity')?.setValue(parseInt(this.shopFG.get('quantity')?.value) - 1)
  }

  orderNow() {
    console.log(this.shopFG.valid)
    if(!this.shopFG.valid) {
      return
    }

    let order = this.shopFG.value

    let textToSend = `
      %0a
      Hey My name is ${order.name} %0a
      Please book my order of ${order.type == 'std' ? 'Standard Hi Card' : `Customized Hi Card with text ${order.cardText}`} %0a
      My Order quantity is ${order.quantity} %0a
      My Shipping details are below %0a
      Phone : ${order.phone} %0a
      Email : ${order.email} %0a
      Address : ${order.address} %0a
      Pincode : ${order.pincode} %0a
    `

    console.log(textToSend)
    let link = `https://wa.me/917303258121?text=${textToSend}`
    window.location.href = link
    console.log(this.shopFG.value)
  }

  signUpNow() {
    let signupDetail = this.signUpFG.value

    this.error.display = false;
    let email = this.signUpFG.value.email;

    if(email === "" || !this.signUpFG.valid){
      this.error.display = true;
      this.error.message = "Please Enter a valid Email"
      return
    }

    this.mainService.signUpNow(email).subscribe((res:any)=>{
      console.log(res.username)
      let username = res.username
      window.location.href = `/${username}`
    }, err => {
      this.error.display = true;
      this.error.message = err.error.error.message
      this.error.message += ", Try Logging in"
      return
    })


    console.log()
  }

}
