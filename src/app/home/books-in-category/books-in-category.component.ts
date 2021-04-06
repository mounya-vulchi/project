import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-books-in-category',
  templateUrl: './books-in-category.component.html',
  styleUrls: ['./books-in-category.component.css']
})
export class BooksInCategoryComponent implements OnInit {

  username;
  booksArray=[];
  
  @Input() searchTerm:string;  
  constructor(private ds:DataService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getBooks();
  }

  getBooks(){
    this.ds.getAllBooks().subscribe(
      res=>{
        this.booksArray=res.booksarray;
      },
      err=>{
        this.toastr.error("Error! Something went wrong...!")
        console.log("the error is ",err)
      }
    )
  }

  bookDetails(book){
    //console.log("the book is ",book)
    localStorage.setItem("book",book["booktitle"])
    this.router.navigateByUrl("/home/bookdetails")
  }
}
