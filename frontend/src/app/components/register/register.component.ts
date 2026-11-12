import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <div class="card rounded-4 shadow-sm p-4">
            <h2 class="mb-4 text-center">Register</h2>
            <form (ngSubmit)="register()">
              <div class="row g-3">
                <div class="col-md-6"><input class="form-control" [(ngModel)]="form.username" name="username" placeholder="Username" required /></div>
                <div class="col-md-6"><input class="form-control" [(ngModel)]="form.email" name="email" type="email" placeholder="Email" required /></div>
                <div class="col-md-6"><input class="form-control" [(ngModel)]="form.first_name" name="first_name" placeholder="First Name" /></div>
                <div class="col-md-6"><input class="form-control" [(ngModel)]="form.last_name" name="last_name" placeholder="Last Name" /></div>
                <div class="col-md-6"><input class="form-control" [(ngModel)]="form.phone" name="phone" placeholder="Phone" /></div>
                <div class="col-md-6"><input class="form-control" [(ngModel)]="form.password" name="password" type="password" placeholder="Password" required /></div>
                <div class="col-12"><textarea class="form-control" [(ngModel)]="form.address" name="address" rows="3" placeholder="Address"></textarea></div>
                <div class="col-12"><button class="btn btn-warning w-100" type="submit">Create Account</button></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: ['h2 { color: #2a170d; font-weight: 800; }']
})
export class RegisterComponent {
  form = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.form).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
