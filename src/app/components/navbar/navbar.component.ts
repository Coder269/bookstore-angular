import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/Model/Role';
import { AutheticationService } from 'src/app/Service/authetication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  currentUserFirstname: string;
  currentUserLastname: string;
  currentUserRole: Role;

  constructor(
    private authenticationService: AutheticationService,
    private router: Router
  ) {
    this.currentUserFirstname = authenticationService.currentUser.firstname;
    this.currentUserLastname = authenticationService.currentUser.lastname;
    this.currentUserRole = authenticationService.currentUser.role;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
