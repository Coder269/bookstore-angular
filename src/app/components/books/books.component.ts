import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Model/Book';
import { BookService } from 'src/app/Service/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: () => this.getAllBooks(),
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }
}
