import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-available-categories',
  templateUrl: './available-categories.component.html',
  styleUrls: ['./available-categories.component.css']
})
export class AvailableCategoriesComponent implements OnInit {

  categories=[];
  books;
  constructor(private ds:DataService, private router:Router) { }

  ngOnInit(): void {
    this.ds.getAllBooks().subscribe(
      res=>{
        this.books=res.booksarray;
        this.categories=[...new Set(this.books.map(x=>x.category))];
        //console.log("categories are ",this.categories);
      }
    )
  }
  
  categoryBooks(c){
    
  }

  bookDetails(book){
    //console.log("the book is ",book)
    localStorage.setItem("book",book["booktitle"])
    this.router.navigateByUrl("/admin/editbook")
  }



}
