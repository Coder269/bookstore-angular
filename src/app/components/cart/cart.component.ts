import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Model/Cart';
import { User } from 'src/app/Model/User';
import { AutheticationService } from 'src/app/Service/authetication.service';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userCart: Cart = new Cart(new User('', '', '', ''));
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private authenticationService: AutheticationService
  ) {}

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart() {
    let userId: number = this.authenticationService.currentUser.id;
    this.cartService.getUserCart(userId).subscribe({
      next: (respose: Cart) => {
        this.userCart = respose;
        for (let book of this.userCart.items) {
          this.totalPrice += book.price;
        }
        if (this.userCart == null) this.createUserCart();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  createUserCart() {
    this.userCart = new Cart(this.authenticationService.currentUser);
    this.cartService.createCart(this.userCart).subscribe({
      next: (reponse: Cart) => (this.userCart = reponse),
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  delete(index: number) {
    this.totalPrice = 0;
    this.userCart.items.splice(index, 1);
    this.userCart.user = this.authenticationService.currentUser;
    this.cartService.updateCart(this.userCart).subscribe({
      next: (response: Cart) => this.getUserCart(),
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }
}
