import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Model/Cart';
import { Purchase } from 'src/app/Model/Purchase';
import { User } from 'src/app/Model/User';
import { AutheticationService } from 'src/app/Service/authetication.service';
import { CartService } from 'src/app/Service/cart.service';
import { TransactionService } from 'src/app/Service/transaction.service';

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
    private authenticationService: AutheticationService,
    private transactionService: TransactionService,
    private router: Router
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

  buy() {
    this.userCart.user = this.authenticationService.currentUser;
    for (let book of this.userCart.items) {
      let purchase = new Purchase(this.userCart.user, book, book.price);
      this.transactionService.makeTransaction(purchase).subscribe({
        next: (response: Purchase) => this.deleteItemsFromCart(),
        error: (error: HttpErrorResponse) => console.log(error.message),
      });
    }
  }

  deleteItemsFromCart() {
    this.userCart.items.pop();

    if (this.userCart.items.length == 0) {
      this.userCart.user = this.authenticationService.currentUser;
      this.cartService.updateCart(this.userCart).subscribe({
        next: (response: Cart) => {
          this.userCart = response;
          alert('Transaction successful');
          this.router.navigate(['/history']);
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
      });
    }
  }
}
