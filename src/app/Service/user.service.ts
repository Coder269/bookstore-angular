import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../Model/User';

const API_URL = environment.baseApiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json; charset=UTF-8',
    });
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + 'admin/all-users', {
      headers: this.headers,
    });
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete(API_URL + `admin/user-delete/${id}`, {
      headers: this.headers,
    });
  }

  public makeAdmin(email: string): Observable<any> {
    return this.http.put(API_URL + `admin/make-admin/${email}`, email, {
      headers: this.headers,
    });
  }

  public getUserInfo(id: number): Observable<User> {
    this.getHeaders();
    return this.http.get<User>(API_URL + `user-info/${id}`, {
      headers: this.headers,
    });
  }

  getHeaders() {
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json; charset=UTF-8',
    });
  }
}
