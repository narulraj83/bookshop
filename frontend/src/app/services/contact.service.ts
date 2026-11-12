import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly apiUrl = 'http://localhost:8000/api/contact';

  constructor(private http: HttpClient) {}

  submitEnquiry(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit/`, data);
  }
}
