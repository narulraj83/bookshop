import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <div class="container py-5">
      @if (cart?.items?.length) {
        <div class="row g-4">
          <div class="col-lg-8">
            @for (item of cart.items; track item.id) {
              <div class="card mb-3 p-3 rounded-4 shadow-sm">
                <div class="row g-3 align-items-center">
                  <div class="col-md-2"><img [src]="item.book_cover || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80'" class="cart-image" alt="{{ item.book_title }}" /></div>
                  <div class="col-md-4"><h5>{{ item.book_title }}</h5><p class="text-muted mb-0">Price: ₹{{ item.unit_price }}</p></div>
                  <div class="col-md-3">
                    <div class="d-flex align-items-center gap-2">
                      <button class="btn btn-outline-dark btn-sm" (click)="changeQty(item.id, item.quantity - 1)">-</button>
                      <span class="fw-bold">{{ item.quantity }}</span>
                      <button class="btn btn-outline-dark btn-sm" (click)="changeQty(item.id, item.quantity + 1)">+</button>
                    </div>
                  </div>
                  <div class="col-md-2"><strong>₹{{ item.subtotal }}</strong></div>
                  <div class="col-md-1"><button class="btn btn-link text-danger" (click)="removeItem(item.id)">Remove</button></div>
                </div>
              </div>
            }
          </div>
          <div class="col-lg-4">
            <div class="card rounded-4 p-4 shadow-sm">
              <h4>Order Summary</h4>
              <div class="d-flex justify-content-between"><span>Subtotal</span><span>₹{{ cart.subtotal }}</span></div>
              <div class="d-flex justify-content-between"><span>Discount</span><span>-₹{{ cart.discount }}</span></div>
              <hr />
              <div class="d-flex justify-content-between fw-bold"><span>Total</span><span>₹{{ cart.total }}</span></div>
              <a class="btn btn-warning w-100 mt-3" routerLink="/checkout">Proceed to Checkout</a>
            </div>
          </div>
        </div>
      } @else {
        <div class="text-center py-5">
          <h3>Your cart is empty.</h3>
          <a class="btn btn-warning mt-3" routerLink="/books">Continue Shopping</a>
        </div>
      }
    </div>
    <app-footer></app-footer>
  `,
  styles: ['.cart-image { width: 100%; border-radius: 12px; object-fit: cover; height: 100px; }']
})
export class CartComponent implements OnInit {
  cart: any = { items: [] };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe((response) => {
      this.cart = response;
    });
  }

  changeQty(itemId: number, quantity: number): void {
    this.cartService.updateItem(itemId, quantity).subscribe(() => this.loadCart());
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId).subscribe(() => this.loadCart());
  }
}
