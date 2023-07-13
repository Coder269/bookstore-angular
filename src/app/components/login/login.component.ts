import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { AutheticationService } from 'src/app/Service/authetication.service';

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
            this.authenticationService.currentUserFirstname =
              response.firstname;
            this.authenticationService.currentUserLastname = response.lastname;
            this.authenticationService.currentUserRole = response.role;
            // Redirect to protected page or home page
            this.router.navigate(['/home']);
          },
          error: (error) => {
            this.invalidLogin = true;
          },
        });
    }
  }
}
