import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BooksComponent } from '../admin/books/books.component';
import { Book } from 'src/app/models/book';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-register',
  templateUrl: './book-register.component.html',
  styleUrls: ['./book-register.component.css']
})
export class BookRegisterComponent implements OnInit {

  bookForm: FormGroup;
  book: Book;

  public get controls() {
    return this.bookForm.controls;
  }

  constructor(
    public dialogRef: MatDialogRef<BookRegisterComponent, Book>,
    @Inject(MAT_DIALOG_DATA) public bookId: string,
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.bookId) {
      this.fillForm();
    }
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      language: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      coverPage: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      amazonLink: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(5)]],
      offer: [false]
    });
  }

  fillForm() {
    this.bookService.getBook(this.bookId).subscribe(book => {
      this.book = book;
      this.controls['title'].setValue(book.title);
      this.controls['language'].setValue(book.language);
      this.controls['description'].setValue(book.description);
      this.controls['coverPage'].setValue(book.coverPage);
      this.controls['price'].setValue(book.price);
      this.controls['amazonLink'].setValue(book.amazonLink);
      this.controls['author'].setValue(book.author);
      this.controls['offer'].setValue(book.offer);
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.bookForm.valid) {
      this.book = {
        id: this.bookId,
        title: this.controls['title'].value,
        language: this.controls['language'].value,
        description: this.controls['description'].value,
        coverPage: this.controls['coverPage'].value,
        price: +this.controls['price'].value,
        amazonLink: this.controls['amazonLink'].value,
        author: this.controls['author'].value,
        offer: this.controls['offer'].value
      };

      if (this.bookId) {
        this.bookService.updateBook(this.book).subscribe(result => {
          console.log('Update result');
          console.log(result);
          this.dialogRef.close(result);
        })
      } else {
        this.bookService.saveBook(this.book).subscribe(result => {
          this.dialogRef.close(result);
        });
      }
    }
  }

}
