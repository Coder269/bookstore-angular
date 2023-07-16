import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './Router/app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BooksComponent } from './components/books/books.component';
import { UsersComponent } from './components/users/users.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookComponent } from './components/book/book.component';
import { AllTransactionsComponent } from './components/all-transactions/all-transactions.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    NavbarComponent,
    TransactionsComponent,
    BooksComponent,
    UsersComponent,
    AddBookComponent,
    BookCardComponent,
    BookComponent,
    AllTransactionsComponent,
    CartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
