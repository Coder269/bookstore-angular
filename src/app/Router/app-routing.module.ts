import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ErrorComponent } from '../components/error/error.component';
import { authGuard } from '../Guard/auth.guard';
import { TransactionsComponent } from '../components/transactions/transactions.component';
import { UsersComponent } from '../components/users/users.component';
import { BooksComponent } from '../components/books/books.component';
import { AddBookComponent } from '../components/add-book/add-book.component';
import { BookComponent } from '../components/book/book.component';
import { AllTransactionsComponent } from '../components/all-transactions/all-transactions.component';
import { CartComponent } from '../components/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'history',
    component: TransactionsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'transactions',
    component: AllTransactionsComponent,
    canActivate: [authGuard],
  },
  { path: 'book/:id', component: BookComponent, canActivate: [authGuard] },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
  },
  {
    path: 'addbook',
    component: AddBookComponent,
    canActivate: [authGuard],
  },
  {
    path: 'books',
    component: BooksComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
