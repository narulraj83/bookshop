import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <div class="container py-5">
      <div class="card rounded-4 p-4 shadow-sm">
        <h3>My Profile</h3>
        <form (ngSubmit)="saveProfile()">
          <div class="row g-3">
            <div class="col-md-6"><input class="form-control" [(ngModel)]="profile.first_name" name="first_name" placeholder="First Name" /></div>
            <div class="col-md-6"><input class="form-control" [(ngModel)]="profile.last_name" name="last_name" placeholder="Last Name" /></div>
            <div class="col-md-6"><input class="form-control" [(ngModel)]="profile.email" name="email" type="email" placeholder="Email" /></div>
            <div class="col-md-6"><input class="form-control" [(ngModel)]="profile.phone" name="phone" placeholder="Phone" /></div>
            <div class="col-12"><textarea class="form-control" [(ngModel)]="profile.address" name="address" rows="4" placeholder="Address"></textarea></div>
            <div class="col-12"><button class="btn btn-warning" type="submit">Save</button></div>
          </div>
        </form>
      </div>
    </div>
    <app-footer></app-footer>
  `
})
export class UserProfileComponent implements OnInit {
  profile = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user) => {
      this.profile = {
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      };
    });
  }

  saveProfile(): void {
    alert('Profile update is ready to be wired to your backend endpoint.');
  }
}
