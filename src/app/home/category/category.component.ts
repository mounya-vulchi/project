import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  booksArray;
  @Input() searchTerm:String;
  @Input() category:String;
  constructor(private ds:DataService, private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.ds.getAllBooks().subscribe(
      res=>{
        this.booksArray=res.booksarray;
      },
      err=>{
        this.toastr.error("Something went wrong")
        console.log("the error is ",err)

      }
    )
  }
  bookDetails(book){
    //console.log("the book is ",book)
    localStorage.setItem("book",book.booktitle)
    this.router.navigateByUrl("/home/bookdetails")
  }

}
