import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <div class="container py-5">
      <div class="row g-4">
        <div class="col-lg-7">
          <div class="card rounded-4 p-4 shadow-sm">
            <h3>Checkout</h3>
            <form (ngSubmit)="placeOrder()">
              <div class="row g-3">
                <div class="col-md-6"><input class="form-control" [(ngModel)]="form.customer_name" name="customer_name" placeholder="Customer Name" required /></div>
                <div class="col-md-6"><input class="form-control" [(ngModel)]="form.email" name="email" type="email" placeholder="Email" required /></div>
                <div class="col-md-6"><input class="form-control" [(ngModel)]="form.mobile" name="mobile" placeholder="Mobile Number" required /></div>
                <div class="col-md-6"><input class="form-control" [(ngModel)]="form.city" name="city" placeholder="City" required /></div>
                <div class="col-md-6"><input class="form-control" [(ngModel)]="form.state" name="state" placeholder="State" required /></div>
                <div class="col-md-6"><input class="form-control" [(ngModel)]="form.pincode" name="pincode" placeholder="Pincode" required /></div>
                <div class="col-12"><textarea class="form-control" [(ngModel)]="form.address" name="address" placeholder="Delivery Address" rows="4" required></textarea></div>
                <div class="col-12">
                  <label class="form-label">Payment Method</label>
                  <select class="form-select" [(ngModel)]="form.payment_method" name="payment_method">
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Net Banking">Net Banking</option>
                  </select>
                </div>
                <div class="col-12"><button class="btn btn-warning w-100" type="submit">Place Order</button></div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="card rounded-4 p-4 shadow-sm">
            <h4>Order Summary</h4>
            @if (cart?.items?.length) {
              @for (item of cart.items; track item.id) {
                <div class="d-flex justify-content-between mb-2"><span>{{ item.book_title }} x {{ item.quantity }}</span><span>₹{{ item.subtotal }}</span></div>
              }
            }
            <hr />
            <div class="d-flex justify-content-between"><span>Subtotal</span><span>₹{{ cart.subtotal }}</span></div>
            <div class="d-flex justify-content-between"><span>Discount</span><span>-₹{{ cart.discount }}</span></div>
            <div class="d-flex justify-content-between fw-bold mt-2"><span>Total</span><span>₹{{ cart.total }}</span></div>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `
})
export class CheckoutComponent {
  form = {
    customer_name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    payment_method: 'Cash on Delivery',
  };
  cart: any = { items: [], subtotal: 0, discount: 0, total: 0 };

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) {
    this.cartService.getCart().subscribe((response) => this.cart = response);
  }

  placeOrder(): void {
    const payload = {
      ...this.form,
      cart_items: this.cart.items.map((item: any) => ({ book_id: item.book_id, quantity: item.quantity }))
    };
    this.orderService.checkout(payload).subscribe((response) => {
      alert('Order placed successfully!');
      this.router.navigate(['/orders']);
    });
  }
}
