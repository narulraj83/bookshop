import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly apiUrl = 'http://localhost:8000/api/orders';

  constructor(private http: HttpClient) {}

  checkout(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout/`, data);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  getOrder(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/`);
  }
}
