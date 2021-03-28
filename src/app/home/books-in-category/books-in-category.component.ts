import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-books-in-category',
  templateUrl: './books-in-category.component.html',
  styleUrls: ['./books-in-category.component.css']
})
export class BooksInCategoryComponent implements OnInit {

  booksArray=[];
  @Input() searchTerm:string;  
  constructor(private ds:DataService, private router:Router ) { }

  ngOnInit(): void {
    this.getBooks();
    localStorage.clear();
  }


  getBooks(){
    this.ds.getAllBooks().subscribe(
      res=>{
        this.booksArray=res["booksarray"]
      },
      err=>{
        alert("Something went wrong")
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
