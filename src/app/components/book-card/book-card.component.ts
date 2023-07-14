import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  @Input()
  id: number = 0;

  @Input()
  imageUrl: string = '';

  @Input()
  title: string = '';

  @Input()
  author: string = '';

  @Input()
  price: number = 0;

  @Input()
  addTime: Date = new Date();
}
