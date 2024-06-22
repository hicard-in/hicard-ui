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
  ) { 
    // window.location.href = "https://hicard.in"
  }

  ngOnInit(): void {
    // window.location.href = "https://hicard.in"
  }

}
