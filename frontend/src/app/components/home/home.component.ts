import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <section class="hero py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <span class="badge text-bg-warning mb-3">Curated for curious minds</span>
            <h1>Discover Your Next Favourite Book</h1>
            <p>Explore inspiring fiction, insightful technology reads, and life-changing educational books from around the world.</p>
            <div class="d-flex gap-3 mt-4 flex-wrap">
              <a class="btn btn-warning btn-lg" routerLink="/books">Shop Now</a>
              <a class="btn btn-outline-dark btn-lg" routerLink="/about">Learn More</a>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80" class="hero-image" alt="Books" />
          </div>
        </div>
      </div>
    </section>

    <section class="container py-4">
      <div class="row g-3">
        <div class="col-12">
          <div class="search-box p-3 rounded-4">
            <div class="row g-2">
              <div class="col-md-5">
                <input class="form-control" [(ngModel)]="query" placeholder="Search by title, author, or category" />
              </div>
              <div class="col-md-3">
                <select class="form-select" [(ngModel)]="selectedCategory">
                  <option value="">All Categories</option>
                  @for (category of categories; track category.id) {
                    <option [value]="category.slug">{{ category.name }}</option>
                  }
                </select>
              </div>
              <div class="col-md-2">
                <button class="btn btn-dark w-100" (click)="searchBooks()">Search</button>
              </div>
              <div class="col-md-2">
                <a class="btn btn-outline-dark w-100" routerLink="/books">View All</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Featured Books</h2>
      </div>
      <div class="row g-4">
        @for (book of featuredBooks; track book.id) {
          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="card h-100 product-card">
              <img [src]="book.cover_image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'" class="card-img-top" alt="{{ book.title }}" />
              <div class="card-body">
                <div class="d-flex justify-content-between"><span class="text-muted small">{{ book.category.name }}</span><span class="rating">★ {{ book.rating }}</span></div>
                <h5 class="card-title mt-2">{{ book.title }}</h5>
                <p class="author">by {{ book.author }}</p>
                <div class="price-row">
                  <span class="new-price">₹{{ book.discount_price }}</span>
                  <span class="old-price">₹{{ book.original_price }}</span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section>

    <section class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Best Selling Books</h2>
      </div>
      <div class="row g-4">
        @for (book of bestSellingBooks; track book.id) {
          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="card h-100 product-card">
              <img [src]="book.cover_image || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80'" class="card-img-top" alt="{{ book.title }}" />
              <div class="card-body">
                <div class="d-flex justify-content-between"><span class="text-muted small">{{ book.category.name }}</span><span class="rating">★ {{ book.rating }}</span></div>
                <h5 class="card-title mt-2">{{ book.title }}</h5>
                <p class="author">by {{ book.author }}</p>
                <div class="price-row">
                  <span class="new-price">₹{{ book.discount_price }}</span>
                  <span class="old-price">₹{{ book.original_price }}</span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section>

    <section class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Latest Arrivals</h2>
      </div>
      <div class="row g-4">
        @for (book of latestBooks; track book.id) {
          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="card h-100 product-card">
              <img [src]="book.cover_image || 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80'" class="card-img-top" alt="{{ book.title }}" />
              <div class="card-body">
                <div class="d-flex justify-content-between"><span class="text-muted small">{{ book.category.name }}</span><span class="rating">★ {{ book.rating }}</span></div>
                <h5 class="card-title mt-2">{{ book.title }}</h5>
                <p class="author">by {{ book.author }}</p>
                <div class="price-row">
                  <span class="new-price">₹{{ book.discount_price }}</span>
                  <span class="old-price">₹{{ book.original_price }}</span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section>

    <app-footer></app-footer>
  `,
  styles: [`
    .hero { background: linear-gradient(135deg, #f9f1e7 0%, #f0d7b5 100%); }
    .hero-image { width: 100%; max-width: 520px; border-radius: 24px; box-shadow: 0 20px 50px rgba(42, 23, 13, 0.15); }
    .hero h1 { font-size: 3rem; font-weight: 800; color: #2a170d; }
    .search-box { background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
    .product-card { border: none; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 24px rgba(0,0,0,0.06); transition: transform .2s ease; }
    .product-card:hover { transform: translateY(-6px); }
    .product-card img { height: 260px; object-fit: cover; }
    .card-title { font-weight: 700; }
    .price-row { display:flex; gap: 10px; align-items:center; }
    .new-price { color:#c44f13; font-weight:700; font-size:1.2rem; }
    .old-price { text-decoration: line-through; color:#8a8a8a; }
    .rating { color:#f4a100; font-weight:700; }
    .author { color:#666; font-size:.9rem; }
  `]
})
export class HomeComponent implements OnInit {
  featuredBooks: Book[] = [];
  bestSellingBooks: Book[] = [];
  latestBooks: Book[] = [];
  categories: any[] = [];
  query = '';
  selectedCategory = '';

  constructor(private bookService: BookService, private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getFeaturedBooks().subscribe((books) => this.featuredBooks = books);
    this.bookService.getBestSellingBooks().subscribe((books) => this.bestSellingBooks = books);
    this.bookService.getLatestBooks().subscribe((books) => this.latestBooks = books);
    this.categoryService.getCategories().subscribe((categories) => this.categories = categories);
  }

  searchBooks(): void {
    const params = {
      q: this.query,
      category: this.selectedCategory
    };
    localStorage.setItem('book-search', JSON.stringify(params));
    this.router.navigate(['/books']);
  }
}
