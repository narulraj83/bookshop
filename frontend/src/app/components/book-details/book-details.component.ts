import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    @if (book) {
      <div class="container py-5">
        <div class="row g-5 align-items-center">
          <div class="col-lg-5">
            <img [src]="book.cover_image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80'" class="detail-image" alt="{{ book.title }}" />
          </div>
          <div class="col-lg-7">
            <span class="badge bg-warning text-dark">{{ book.category.name }}</span>
            <h1 class="mt-3">{{ book.title }}</h1>
            <p class="author">by {{ book.author }}</p>
            <p class="rating">★ {{ book.rating }} / 5</p>
            <div class="price-row">
              <span class="new-price">₹{{ book.discount_price }}</span>
              <span class="old-price">₹{{ book.original_price }}</span>
            </div>
            <p class="mt-4">{{ book.description }}</p>
            <div class="mt-3 text-muted">Stock Available: {{ book.stock }}</div>
            <div class="d-flex gap-3 mt-4">
              <button class="btn btn-warning btn-lg" (click)="addToCart(book.id)">Add to Cart</button>
              <button class="btn btn-outline-dark btn-lg" (click)="buyNow()">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    }
    <app-footer></app-footer>
  `,
  styles: [`
    .detail-image { width: 100%; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,.12); }
    .author { color: #666; font-size: 1.1rem; }
    .rating { color: #f4a100; font-weight: 700; }
    .price-row { display:flex; gap: 12px; align-items: center; }
    .new-price { color:#c44f13; font-size: 2rem; font-weight:700; }
    .old-price { text-decoration: line-through; color:#8a8a8a; font-size: 1.2rem; }
  `]
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;

  constructor(private route: ActivatedRoute, private bookService: BookService, private cartService: CartService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id).subscribe((book) => this.book = book);
  }

  addToCart(bookId: number): void {
    this.cartService.addToCart(bookId, 1).subscribe(() => alert('Added to cart'));
  }

  buyNow(): void {
    if (this.book) {
      this.cartService.addToCart(this.book.id, 1).subscribe(() => window.location.href = '/checkout');
    }
  }
}
