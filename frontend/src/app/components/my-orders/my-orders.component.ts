import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <div class="container py-5">
      @if (orders.length) {
        @for (order of orders; track order.id) {
          <div class="card rounded-4 shadow-sm p-4 mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4>Order #{{ order.id }}</h4>
              <span class="badge bg-warning text-dark">{{ order.status }}</span>
            </div>
            <p class="mb-1"><strong>Date:</strong> {{ order.created_at | date:'mediumDate' }}</p>
            <p class="mb-1"><strong>Customer:</strong> {{ order.customer_name }}</p>
            <p class="mb-1"><strong>Total:</strong> ₹{{ order.total_amount }}</p>
            <ul class="list-group list-group-flush mt-3">
              @for (item of order.items; track item.id) {
                <li class="list-group-item d-flex justify-content-between">
                  <span>{{ item.book_title }} x {{ item.quantity }}</span>
                  <span>₹{{ item.subtotal }}</span>
                </li>
              }
            </ul>
          </div>
        }
      } @else {
        <div class="text-center py-5">
          <h3>No orders found.</h3>
        </div>
      }
    </div>
    <app-footer></app-footer>
  `
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((response) => this.orders = response.results || response);
  }
}
