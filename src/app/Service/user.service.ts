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

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(API_URL + 'admin/user-update', user, {
      headers: this.headers,
    });
  }

  public updateUserFirstname(id: number, firstname: string): Observable<any> {
    return this.http.put(API_URL + `admin/update-firstname/${id}`, firstname, {
      headers: this.headers,
    });
  }

  public updateUserLastname(id: number, lastname: string): Observable<any> {
    return this.http.put(API_URL + `admin/update-lastname/${id}`, lastname, {
      headers: this.headers,
    });
  }

  public updateUserEmail(id: number, email: string): Observable<any> {
    return this.http.put(API_URL + `admin/update-email/${id}`, email, {
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
