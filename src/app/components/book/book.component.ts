import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/Model/Book';
import { Purchase } from 'src/app/Model/Purchase';
import { AutheticationService } from 'src/app/Service/authetication.service';
import { BookService } from 'src/app/Service/book.service';
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

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private authenticationService: AutheticationService,
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
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  buy() {
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
  }
}
