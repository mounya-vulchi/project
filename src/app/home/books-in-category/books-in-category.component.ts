import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-books-in-category',
  templateUrl: './books-in-category.component.html',
  styleUrls: ['./books-in-category.component.css']
})
export class BooksInCategoryComponent implements OnInit {

  username;
  booksArray=[];
  alert;
  closeAlert;
  @Input() searchTerm:string;  
  constructor(private ds:DataService, private router:Router ) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getBooks();
  }

  getBooks(){
    this.ds.getAllBooks().subscribe(
      res=>{
        this.booksArray=res["booksarray"]
      },
      err=>{
        this.alert=true;
        this.closeAlert=false;
                setTimeout(() => {
                  this.alert = false;
                  this.closeAlert = true;
                }, 3000);
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
