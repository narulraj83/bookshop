import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <div class="container py-5">
      <div class="row g-4 align-items-center">
        <div class="col-lg-5">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you. Send us a message and our team will get back to you soon.</p>
        </div>
        <div class="col-lg-7">
          <form class="card p-4 shadow-sm rounded-4" (ngSubmit)="submit()">
            <div class="row g-3">
              <div class="col-md-6"><input class="form-control" [(ngModel)]="form.name" name="name" placeholder="Your Name" required /></div>
              <div class="col-md-6"><input class="form-control" [(ngModel)]="form.email" name="email" type="email" placeholder="Email" required /></div>
              <div class="col-md-6"><input class="form-control" [(ngModel)]="form.mobile" name="mobile" placeholder="Mobile Number" required /></div>
              <div class="col-md-6"><input class="form-control" [(ngModel)]="form.subject" name="subject" placeholder="Subject" required /></div>
              <div class="col-12"><textarea class="form-control" [(ngModel)]="form.message" name="message" rows="5" placeholder="Message" required></textarea></div>
              <div class="col-12"><button class="btn btn-warning w-100" type="submit">Submit</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: ['h1 { color: #2a170d; font-weight: 800; }']
})
export class ContactUsComponent {
  form = {
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  };

  constructor(private contactService: ContactService) {}

  submit(): void {
    this.contactService.submitEnquiry(this.form).subscribe(() => {
      alert('Your enquiry has been submitted.');
      this.form = { name: '', email: '', mobile: '', subject: '', message: '' };
    });
  }
}
