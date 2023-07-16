import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/Model/Book';
import { Cart } from 'src/app/Model/Cart';
import { Purchase } from 'src/app/Model/Purchase';
import { User } from 'src/app/Model/User';
import { AutheticationService } from 'src/app/Service/authetication.service';
import { BookService } from 'src/app/Service/book.service';
import { CartService } from 'src/app/Service/cart.service';
import { TransactionService } from 'src/app/Service/transaction.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  currentBook: Book = new Book('', '', '', '', 0);
  id: number = 0;
  userPurchases: Purchase[] = [];
  inLibrary = false;
  inCart = false;
  userCart: Cart = new Cart(new User('', '', '', ''));

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private authenticationService: AutheticationService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUserPurchases();
  }
  getUserPurchases() {
    let userEmail: string = this.authenticationService.currentUser.email;
    this.transactionService.getUserPurchases(userEmail).subscribe({
      next: (response: Purchase[]) => {
        this.userPurchases = response;
        this.getAllBooks();
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;
        for (let book of this.books) {
          if (book.id == this.id) {
            this.currentBook = book;
            for (let transaction of this.userPurchases) {
              if (transaction.book.id == this.id) this.inLibrary = true;
              break;
            }
            break;
          }
        }
        this.getUserCart();
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  getUserCart() {
    let userId: number = this.authenticationService.currentUser.id;
    this.cartService.getUserCart(userId).subscribe({
      next: (respose: Cart) => {
        this.userCart = respose;
        if (this.userCart == null) return;
        else {
          for (let book of this.userCart.items) {
            if (book.id == this.currentBook.id) this.inCart = true;
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  addToCart() {
    if (this.inCart) return;
    let userId: number = this.authenticationService.currentUser.id;
    this.cartService.getUserCart(userId).subscribe({
      next: (respose: Cart) => {
        this.userCart = respose;
        if (this.userCart == null) this.createUserCart();
        else this.addItem();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });

    /*
    let purchase: Purchase = new Purchase(
      this.authenticationService.currentUser,
      this.currentBook,
      this.currentBook.price
    );
    this.transactionService.makeTransaction(purchase).subscribe({
      next: (response: Purchase) => {
        alert('Transaction is successful!');
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
    */
  }
  createUserCart() {
    this.userCart = new Cart(this.authenticationService.currentUser);
    this.cartService.createCart(this.userCart).subscribe({
      next: (reponse: Cart) => {
        this.userCart = reponse;
        this.addItem();
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  addItem() {
    this.userCart.items.push(this.currentBook);
    this.userCart.user = this.authenticationService.currentUser;
    this.cartService.updateCart(this.userCart).subscribe({
      next: (response: Cart) => (this.inCart = true),
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }
}
