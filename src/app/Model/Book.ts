export class Book {
  id: number = 0;
  imageUrl: string;
  title: string;
  author: string;
  description: string;
  price: number;
  addTime: Date = new Date();

  constructor(
    imageUrl: string,
    title: string,
    author: string,
    description: string,
    price: number
  ) {
    this.imageUrl = imageUrl;
    this.title = title;
    this.author = author;
    this.description = description;
    this.price = price;
  }
}
