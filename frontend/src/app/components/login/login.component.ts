import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm rounded-4 p-4">
            <h2 class="mb-4 text-center">Login</h2>
            <form (ngSubmit)="login()">
              <div class="mb-3"><label>Email</label><input class="form-control" [(ngModel)]="form.email" name="email" type="email" required /></div>
              <div class="mb-3"><label>Password</label><input class="form-control" [(ngModel)]="form.password" name="password" type="password" required /></div>
              <button class="btn btn-warning w-100" type="submit">Login</button>
              <div class="text-center mt-3"><a routerLink="/register">Need an account? Register</a></div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: ['h2 { color: #2a170d; font-weight: 800; }']
})
export class LoginComponent {
  form = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.form).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
