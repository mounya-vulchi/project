import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-books-in-category',
  templateUrl: './books-in-category.component.html',
  styleUrls: ['./books-in-category.component.css']
})
export class BooksInCategoryComponent implements OnInit {

  userId:string;
  booksArray=[];
  
  @Input() searchTerm:string;  
  constructor(private ds:DataService, private router:Router, private toastr:ToastrService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.userId=localStorage.getItem("userId");
    this.getBooks();
  }

  getBooks(){
    this.spinner.show();
    this.ds.getAllBooks().subscribe(
      res=>{
        this.booksArray=res.booksarray;
        this.spinner.hide();
      },
      err=>{
        this.toastr.error("Error! Something went wrong...!")
        console.log("the error is ",err)
      }
    )
  }

  bookDetails(book){
    localStorage.setItem("book",book.bookid);
    this.router.navigateByUrl("/home/bookdetails/"+book.bookid);
  }
}
