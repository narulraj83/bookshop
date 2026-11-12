import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <section class="container py-5">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <h1>Welcome to Book Paradise!</h1>
          <p>We are passionate about bringing the joy of reading to everyone. Our mission is to provide readers with a wide collection of books at affordable prices. From fiction and adventure to science and technology, we help everyone discover their next favourite book.</p>
        </div>
        <div class="col-lg-6">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80" class="img-fluid rounded-4 shadow" alt="About us" />
        </div>
      </div>
      <div class="row mt-5 g-4">
        <div class="col-md-6 col-lg-3"><div class="info-box"><h4>Our Story</h4><p>Founded on a love for books and reading culture, we set out to make literature accessible across every age group.</p></div></div>
        <div class="col-md-6 col-lg-3"><div class="info-box"><h4>Our Mission</h4><p>To deliver compelling stories and informative reads at fair prices for readers everywhere.</p></div></div>
        <div class="col-md-6 col-lg-3"><div class="info-box"><h4>Our Vision</h4><p>To become the most trusted digital bookstore that makes learning and imagination delightful.</p></div></div>
        <div class="col-md-6 col-lg-3"><div class="info-box"><h4>Why Choose Us?</h4><p>Curated collections, trusted quality, secure checkout, and a customer-first shopping experience.</p></div></div>
      </div>
      <div class="mt-5 text-center">
        <h3>Customer Satisfaction</h3>
        <p>We believe every reader deserves a wholesome bookstore experience, and we work hard every day to earn your trust.</p>
      </div>
    </section>
    <app-footer></app-footer>
  `,
  styles: [`
    .info-box { background: #f9f3ec; border-radius: 20px; padding: 24px; height: 100%; }
    h1 { color: #2a170d; font-weight: 800; }
  `]
})
export class AboutUsComponent {}
