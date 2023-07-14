import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/Model/Book';
import { BookService } from 'src/app/Service/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  booksResult: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;
        this.booksResult = this.books;
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  search(form: NgForm) {
    this.bookService.getAllBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;
        this.booksResult = this.books;
        if (form.value.search !== '') {
          this.booksResult = this.books.filter(
            (book) =>
              book.title
                .toLowerCase()
                .includes(form.value.search.toLowerCase()) ||
              book.author
                .toLowerCase()
                .includes(form.value.search.toLowerCase())
          );
        }
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }
}
