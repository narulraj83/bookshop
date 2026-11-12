import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../models/book.model';
import { Category } from '../../models/category.model';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <div class="container py-5">
      <div class="row g-4">
        <div class="col-lg-3">
          <div class="filter-panel p-3 rounded-4">
            <h4>Filters</h4>
            <div class="mb-3">
              <label class="form-label">Search</label>
              <input class="form-control" [(ngModel)]="searchText" (input)="applyFilters()" />
            </div>
            <div class="mb-3">
              <label class="form-label">Category</label>
              <select class="form-select" [(ngModel)]="selectedCategory" (change)="applyFilters()">
                <option value="">All</option>
                @for (category of categories; track category.id) {
                  <option [value]="category.slug">{{ category.name }}</option>
                }
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Price</label>
              <input type="number" class="form-control" placeholder="Min" [(ngModel)]="minPrice" (input)="applyFilters()" />
              <input type="number" class="form-control mt-2" placeholder="Max" [(ngModel)]="maxPrice" (input)="applyFilters()" />
            </div>
            <div class="mb-3">
              <label class="form-label">Sort By</label>
              <select class="form-select" [(ngModel)]="sortBy" (change)="applyFilters()">
                <option value="-created_at">Latest</option>
                <option value="discount_price">Price: Low to High</option>
                <option value="-discount_price">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="row g-4">
            @for (book of books; track book.id) {
              <div class="col-md-6 col-xl-4">
                <div class="card product-card h-100">
                  <img [src]="book.cover_image || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80'" class="card-img-top" alt="{{ book.title }}" />
                  <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between"><span class="badge bg-light text-dark">{{ book.category.name }}</span><span class="rating">★ {{ book.rating }}</span></div>
                    <h5 class="mt-3">{{ book.title }}</h5>
                    <p class="text-muted mb-1">by {{ book.author }}</p>
                    <p class="small text-truncate-3">{{ book.description }}</p>
                    <div class="price-row mt-auto">
                      <span class="new-price">₹{{ book.discount_price }}</span>
                      <span class="old-price">₹{{ book.original_price }}</span>
                    </div>
                    <div class="mt-3 d-flex gap-2">
                      <button class="btn btn-warning flex-fill" (click)="addToCart(book.id)">Add to Cart</button>
                      <a class="btn btn-outline-dark" [routerLink]="['/books', book.id]">View</a>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          <nav class="mt-4" aria-label="Page navigation">
            <ul class="pagination justify-content-center">
              <li class="page-item" [class.disabled]="currentPage === 1">
                <button class="page-link" (click)="changePage(currentPage - 1)">Previous</button>
              </li>
              <li class="page-item active">
                <span class="page-link">{{ currentPage }}</span>
              </li>
              <li class="page-item" [class.disabled]="currentPage >= totalPages">
                <button class="page-link" (click)="changePage(currentPage + 1)">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
    .filter-panel { background: #f7f3ee; border: 1px solid #eaded3; }
    .product-card { border: none; box-shadow: 0 10px 24px rgba(0,0,0,.06); border-radius: 18px; overflow: hidden; }
    .product-card img { height: 260px; object-fit: cover; }
    .price-row { display:flex; gap: 10px; align-items:center; }
    .new-price { color:#c44f13; font-weight:700; font-size:1.2rem; }
    .old-price { text-decoration: line-through; color:#8a8a8a; }
    .rating { color:#f4a100; font-weight:700; }
    .text-truncate-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  `]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  categories: Category[] = [];
  searchText = '';
  selectedCategory = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortBy = '-created_at';
  currentPage = 1;
  totalPages = 1;

  constructor(private bookService: BookService, private categoryService: CategoryService, private cartService: CartService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const search = localStorage.getItem('book-search');
    if (search) {
      const parsed = JSON.parse(search);
      this.searchText = parsed.q || '';
      this.selectedCategory = parsed.category || '';
      localStorage.removeItem('book-search');
    }
    this.categoryService.getCategories().subscribe((categories) => this.categories = categories);
    this.loadBooks();
  }

  loadBooks(): void {
    const params = {
      page: this.currentPage,
      q: this.searchText,
      category: this.selectedCategory,
      min_price: this.minPrice,
      max_price: this.maxPrice,
      ordering: this.sortBy
    };
    this.bookService.getBooks(params).subscribe((response) => {
      this.books = response.results;
      this.totalPages = Math.max(1, Math.ceil((response.count || 0) / 12));
    });
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadBooks();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadBooks();
  }

  addToCart(bookId: number): void {
    this.cartService.addToCart(bookId, 1).subscribe(() => {
      alert('Book added to cart');
    });
  }
}
