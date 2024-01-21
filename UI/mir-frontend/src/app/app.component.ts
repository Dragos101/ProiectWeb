import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title: string = 'mir-frontend';

  constructor(private router: Router) { }

  isLandingPage(): boolean {
    return this.router.url === '/'
  }
}
