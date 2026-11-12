import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer bg-dark-brown mt-5">
      <div class="container py-5">
        <div class="row g-4">
          <div class="col-md-4">
            <h5>Book Paradise</h5>
            <p>Your trusted source for captivating reads and affordable learning.</p>
          </div>
          <div class="col-md-4">
            <h6>Quick Links</h6>
            <ul class="list-unstyled">
              <li><a routerLink="/books">Books</a></li>
              <li><a routerLink="/about">About Us</a></li>
              <li><a routerLink="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h6>Contact</h6>
            <p>Email: hello@bookparadise.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .bg-dark-brown { background: #1a120e; }
      .footer { color: #f5efe7; }
      .footer a { color: #f7a440; text-decoration: none; }
    `
  ]
})
export class FooterComponent {}
