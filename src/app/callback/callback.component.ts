import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(
    private mainService: MainService,
    private router: Router,
  ) {
    
  }

  async ngOnInit() {
    let searchQuery = window.location.search
    let response = await this.mainService.convertTokenWithJqtGoogle(searchQuery)
    if(response) {
      this.router.navigate([`/setting`])
    }
  }

}
