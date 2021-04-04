import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() searchTerm:String;
  username;
  booksArray;
  @Input() category:String;
  constructor(private ds:DataService, private router:Router) { }

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
