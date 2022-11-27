import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.mainService.checkLoggedIn() && this.mainService.getUserName()) {
      let username = this.mainService.getUserName()
      this.router.navigate([`/${username}`])
    } else {
      this.router.navigate(['/shop'])
    }
  }

}
