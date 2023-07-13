import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Role } from '../Model/Role';

const API_URL = environment.baseApiUrl;

@Injectable({
  providedIn: 'root',
})
export class AutheticationService {
  currentUserRole: Role = Role.USER;
  currentUserFirstname: string = '';
  currentUserLastname: string = '';

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<any> {
    const signinRequest = {
      email: email,
      password: password,
    };
    return this.http.post(
      API_URL + 'authentication/authenticate',
      signinRequest
    );
  }

  signUp(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Observable<any> {
    const signupRequest = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };
    return this.http.post(API_URL + 'authentication/register', signupRequest);
  }
}
