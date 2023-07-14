import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/Model/Book';
import { BookService } from 'src/app/Service/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  constructor(private bookService: BookService, private router: Router) {}

  addBook(form: NgForm) {
    if (form.valid) {
      let book: Book = new Book(
        form.value.imageUrl,
        form.value.title,
        form.value.author,
        form.value.description,
        form.value.price
      );

      this.bookService.createBook(book).subscribe({
        next: (response: Book) => {
          alert('Book is seccessfully created!');
          this.router.navigate(['/books']);
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
      });
    }
  }
}
