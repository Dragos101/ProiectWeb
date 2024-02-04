import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})

export class NavbarComponent implements OnInit {
  user?: User;
  userId?: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      }});

    this.user = this.authService.getUser();
    this.userId = localStorage.getItem('user-id')
    console.log(this.userId)
  }

  hideMigrationButton(): boolean {
    return this.router.url !== '/migrations'
  }

  hideStatisticsButton(): boolean {
    return this.router.url !== '/statistics'
  }

  hideIfLanding(): boolean {
    return this.router.url !== ''
  }
}
