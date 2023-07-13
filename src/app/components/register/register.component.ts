import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { AutheticationService } from 'src/app/Service/authetication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  emailTaken = false;
  constructor(
    private authenticationService: AutheticationService,
    private router: Router
  ) {}

  register(form: NgForm) {
    if (form.valid) {
      this.authenticationService
        .signUp(
          form.value.firstname,
          form.value.lastname,
          form.value.email,
          form.value.password
        )
        .subscribe({
          next: () => {
            // Redirect to protected page or home page
            console.log('done');
            this.emailTaken = false;
            alert('Registeration is successful!');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.emailTaken = true;
            console.log(error);
          },
        });
    }
  }
}
