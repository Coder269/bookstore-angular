import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Book } from '../Model/Book';
import { Observable } from 'rxjs';

const API_URL = environment.baseApiUrl;

@Injectable({
  providedIn: 'root',
})
export class BookService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json; charset=UTF-8',
    });
  }

  public getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(API_URL + 'all-books', {
      headers: this.headers,
    });
  }

  public createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(API_URL + 'admin/create-book', book, {
      headers: this.headers,
    });
  }

  public updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(API_URL + 'admin/update-book', book, {
      headers: this.headers,
    });
  }

  public deleteBook(id: number): Observable<any> {
    return this.http.delete(API_URL + `admin/delete-book/${id}`, {
      headers: this.headers,
    });
  }
}
