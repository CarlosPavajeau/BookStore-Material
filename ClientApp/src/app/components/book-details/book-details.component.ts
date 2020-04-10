import { Component, OnInit } from '@angular/core';
import { BookService } from "../../services/book.service";
import { ActivatedRoute } from "@angular/router";
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book = {
    title: '',
    language: '',
    description: '',
    coverPage: '',
    price: 0,
    amazonLink: '',
    author: '',
    offer: false
  }

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id)
      .subscribe(book => {
        console.log(book);
        this.book = book
      });
  }

}
