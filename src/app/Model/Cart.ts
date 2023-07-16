import { Book } from './Book';
import { User } from './User';

export class Cart {
  id: number = 0;
  user: User;
  items: Book[] = [];

  constructor(user: User) {
    this.user = user;
  }
}
