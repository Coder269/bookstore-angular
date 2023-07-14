import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../Model/Purchase';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

const API_URL = environment.baseApiUrl;

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json; charset=UTF-8',
    });
  }

  public makeTransaction(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(API_URL + 'purchase', purchase, {
      headers: this.headers,
    });
  }

  public getUserPurchases(email: string): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(API_URL + `user-purchases/${email}`, {
      headers: this.headers,
    });
  }

  public getAllPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(API_URL + 'admin/all-purchases', {
      headers: this.headers,
    });
  }
}
