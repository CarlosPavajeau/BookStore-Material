import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookRegisterComponent } from '../../book-register/book-register.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[];
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>(this.books);
  displayedColumns: string[] = ['id', 'title', 'author', 'language', 'price', 'offer', 'update', 'delete'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private bookService: BookService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBooks();
    this.dataSource.paginator = this.paginator;
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.dataSource.data = books;
    });
  }

  onUpdate(book: Book): void {
    const dialogRef = this.dialog.open(BookRegisterComponent, {
      width: '700px',
      data: book.id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBooks();
      }
    });
  }

  onDeleteBook(book: Book): void {
    if (confirm("Are you sure?")) {
      this.bookService.deleteBook(book.id).subscribe(bookDeleted => {
        if (bookDeleted) {
          this.books = this.books.filter(b => b.id != book.id);
        }
      });
    }
  }

  onRegister(): void {
    const dialogRef = this.dialog.open(BookRegisterComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBooks();
      }
    })
  }
}
