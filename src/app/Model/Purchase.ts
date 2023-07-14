import { Book } from './Book';
import { User } from './User';

export class Purchase {
  id: number = 0;
  user: User;
  book: Book;
  price: number;
  purchaseDate: Date = new Date();

  constructor(user: User, book: Book, price: number) {
    this.user = user;
    this.book = book;
    this.price = price;
  }
}
