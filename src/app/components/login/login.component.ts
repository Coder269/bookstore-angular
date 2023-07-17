import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { AutheticationService } from 'src/app/Service/authetication.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User('', '', '', '');
  invalidLogin = false;

  constructor(
    private authenticationService: AutheticationService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) this.router.navigate(['/home']);
  }

  login(form: NgForm): void {
    if (form.valid) {
      this.authenticationService
        .signIn(form.value.email, form.value.password)
        .subscribe({
          next: (response: any) => {
            // Signin successful, save the token to localStorage
            localStorage.setItem('token', response.jwt);
            this.authenticationService.currentUser.id = response.id;
            this.getUserInfo();
          },
          error: (error) => {
            this.invalidLogin = true;
          },
        });
    }
  }

  getUserInfo() {
    this.userService
      .getUserInfo(this.authenticationService.currentUser.id)
      .subscribe({
        next: (response: User) => {
          this.authenticationService.currentUserDB = response;
          this.authenticationService.currentUser.firstname =
            this.authenticationService.currentUserDB.firstname;
          this.authenticationService.currentUser.lastname =
            this.authenticationService.currentUserDB.lastname;
          this.authenticationService.currentUser.email =
            this.authenticationService.currentUserDB.email;
          this.authenticationService.currentUser.password =
            this.authenticationService.currentUserDB.password;

          // Redirect to protected page or home page
          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
      });
  }
}
