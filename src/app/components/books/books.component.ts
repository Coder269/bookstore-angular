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
  updatedBook: Book = new Book('', '', '', '', 0);

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

  updateBookModal(book: Book) {
    (document.getElementById('title') as HTMLInputElement).value = book.title;
    (document.getElementById('author') as HTMLInputElement).value = book.author;
    (document.getElementById('description') as HTMLTextAreaElement).value =
      book.description;
    (document.getElementById('price') as HTMLInputElement).value =
      book.price.toString();
    (document.getElementById('imageUrl') as HTMLInputElement).value =
      book.imageUrl;
    this.updatedBook.id = book.id;
  }

  updateBook() {
    this.updatedBook.title = (
      document.getElementById('title') as HTMLInputElement
    ).value;
    this.updatedBook.author = (
      document.getElementById('author') as HTMLInputElement
    ).value;
    this.updatedBook.description = (
      document.getElementById('description') as HTMLTextAreaElement
    ).value;
    this.updatedBook.price = parseFloat(
      (document.getElementById('price') as HTMLTextAreaElement).value
    );
    this.updatedBook.imageUrl = (
      document.getElementById('imageUrl') as HTMLTextAreaElement
    ).value;

    this.bookService.updateBook(this.updatedBook).subscribe({
      next: (response: Book) => this.getAllBooks(),
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }
}
