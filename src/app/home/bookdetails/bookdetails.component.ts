import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  book;
  bookdetails;
  constructor(private ds:DataService, private router:Router) { }

  ngOnInit(): void {
    this.bookdetails=localStorage.getItem("book")
    //console.log("bookdetails are ",this.bookdetails)
    this.getBookDetails();
  }

  getBookDetails(){
    this.ds.getBookDetails(this.bookdetails).subscribe(
      res=>{
        if(["Details"]){
          this.book=res["Details"]
          console.log(this.book)
        }
        else{
          alert("book not found")
        }
      },
      err=>{
        alert("Something went Wrong in Book Details page")
        console.log(err);
      }
    )
  }
}
