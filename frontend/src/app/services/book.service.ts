import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, PaginatedBooks } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly apiUrl = 'http://localhost:8000/api/books';

  constructor(private http: HttpClient) {}

  getBooks(params?: any): Observable<PaginatedBooks> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }
    return this.http.get<PaginatedBooks>(`${this.apiUrl}/`, { params: httpParams });
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}/`);
  }

  getFeaturedBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/featured/`);
  }

  getBestSellingBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/best-selling/`);
  }

  getLatestBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/latest/`);
  }
}
