import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-brown sticky-top">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">
          <span class="brand-mark">B</span> Book Paradise
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/books" routerLinkActive="active">Books</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/about" routerLinkActive="active">About Us</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/contact" routerLinkActive="active">Contact Us</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/orders" routerLinkActive="active">My Orders</a></li>
          </ul>
          <div class="d-flex align-items-center gap-2">
            <a class="btn btn-outline-light btn-sm" routerLink="/cart">Cart</a>
            @if (authService.isLoggedIn()) {
              <a class="btn btn-primary btn-sm" routerLink="/profile">Profile</a>
              <button class="btn btn-outline-warning btn-sm" (click)="logout()">Logout</button>
            } @else {
              <a class="btn btn-outline-light btn-sm" routerLink="/login">Login</a>
              <a class="btn btn-warning btn-sm" routerLink="/register">Register</a>
            }
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .bg-brown { background: #2a170d; }
      .brand-mark { background: #f7a440; color: #2a170d; width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 800; margin-right: 8px; }
      .nav-link { color: #f5efe7; opacity: 0.9; }
      .nav-link.active { color: #f7a440; }
      .navbar-brand { color: #fff; }
    `
  ]
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
