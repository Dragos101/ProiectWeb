import { Component } from '@angular/core';
import { LoginRequest } from '../auth/models/login-request.model';
import { AuthService } from '../auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../auth/models/register-request.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent {
  showLogin: boolean = true;

  loginModel: LoginRequest;
  registerModel: RegisterRequest;

  constructor(private authService: AuthService, private coockieService: CookieService, private router: Router) {
    this.loginModel = {
      email: '',
      password: ''
    }

    this.registerModel = {
      email: '',
      password: ''
    }
  }

  toggleShow(event: Event) {
    event.preventDefault()
    this.showLogin = !this.showLogin
  }

  login(): void {
    this.authService.login(this.loginModel).subscribe({
      next: (response) => {
        this.coockieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');

        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        this.router.navigateByUrl('/migrations');
      }
    })
  }

  register(): void {
    this.authService.register(this.registerModel).subscribe({
      next: (response) => {
        this.coockieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');

        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        this.router.navigateByUrl('/migrations');
      }
    })
  }

}
