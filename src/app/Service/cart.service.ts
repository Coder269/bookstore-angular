import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../Model/Cart';
import { environment } from 'src/environments/environment.development';
import { Book } from '../Model/Book';

const API_URL = environment.baseApiUrl;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json; charset=UTF-8',
    });
  }

  public createCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(API_URL + 'create-cart', cart, {
      headers: this.headers,
    });
  }

  public getUserCart(id: number): Observable<Cart> {
    return this.http.get<Cart>(API_URL + `user-cart/${id}`, {
      headers: this.headers,
    });
  }

  public updateCart(cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(API_URL + 'update-cart', cart, {
      headers: this.headers,
    });
  }

  public removeItemFromCart(id: number, bookId: number): Observable<any> {
    return this.http.put(API_URL + `remove-item/${id}`, bookId, {
      headers: this.headers,
    });
  }
}
