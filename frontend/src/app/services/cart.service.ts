import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly apiUrl = 'http://localhost:8000/api/cart';

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  addToCart(bookId: number, quantity = 1): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/`, { book_id: bookId, quantity });
  }

  updateItem(itemId: number, quantity: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update/${itemId}/`, { quantity });
  }

  removeItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${itemId}/`);
  }
}
