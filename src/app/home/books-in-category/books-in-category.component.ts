import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-books-in-category',
  templateUrl: './books-in-category.component.html',
  styleUrls: ['./books-in-category.component.css']
})
export class BooksInCategoryComponent implements OnInit {

  booksArray=[];
  constructor(private ds:DataService, private router:Router ) { }

  ngOnInit(): void {
    this.getBooks();
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
}
