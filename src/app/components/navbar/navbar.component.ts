import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Model/Cart';
import { Role } from 'src/app/Model/Role';
import { User } from 'src/app/Model/User';
import { AutheticationService } from 'src/app/Service/authetication.service';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUserFirstname: string;
  currentUserLastname: string;
  currentUserRole: Role;
  userCart: Cart = new Cart(new User('', '', '', ''));
  @Input()
  items: number = 0;

  constructor(
    private authenticationService: AutheticationService,
    private cartService: CartService,
    private router: Router
  ) {
    this.currentUserFirstname = authenticationService.currentUser.firstname;
    this.currentUserLastname = authenticationService.currentUser.lastname;
    this.currentUserRole = authenticationService.currentUser.role;
  }
  ngOnInit(): void {
    this.getUserCart();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUserCart() {
    let userId: number = this.authenticationService.currentUser.id;
    this.cartService.getUserCart(userId).subscribe({
      next: (respose: Cart) => {
        this.userCart = respose;
        if (this.userCart != null) this.items = this.userCart.items.length;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
}
