import { Component, OnInit } from '@angular/core';
import { Book } from "../models/book";
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks()
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      books => this.books = books
    );
  }

}
