import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent {
  showLogin: boolean = true;

  toggleShow(event: Event) {
    event.preventDefault()
    this.showLogin = !this.showLogin
  }
}
