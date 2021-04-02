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
  username
  userCartSize;
  constructor(private ds:DataService, private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.bookdetails=localStorage.getItem("book")
    //console.log("bookdetails are ",this.bookdetails)
    this.getBookDetails();
    this.cartStatus();
  }

  getBookDetails(){
    this.ds.getBookDetails(this.bookdetails).subscribe(
      res=>{
        if(["Details"]){
          this.book=res.Details
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
  cartStatus(){
    this.ds.getCartSize(this.username).subscribe(
      res=>{
        this.userCartSize=res.cartsize;
      },
      err=>{
        alert("Something went wrong in getting all products")
        console.log(err)
      }
    )

  }

  additem(book){
    if(this.username!==null){
      let obj={
      username:this.username,
      booktitle:this.book.booktitle,
     author:this.book.author,
      paperback:this.book.paperback,
     price:this.book.price,
      publisher:this.book.publisher,
     publicationdate:this.book.publicationdate,
      rating:this.book.rating,
      category:this.book.category,
      description:this.book.description,
      bookImgLink:this.book.bookImgLink
      }
     
      console.log("this new obj is ",obj)
      this.ds.usercart(obj).subscribe(
        res=>{
          if(res.message=="book already existed"){
            alert("book is already there in cart")
           
          }
          else{
            alert("book added to cart")
            this.cartStatus();
          }
         
        },
        err=>{
          alert("Something went wrong in Adding book")
        console.log(err)
        }
      )
     
    }
    else{
      alert("Please sign in to add to cart");
      this.router.navigateByUrl("/login");
    }
   
  }

  wishlist(book){
    if(this.username!==null){
      let obj={
      username:this.username,
      booktitle:this.book.booktitle,
     author:this.book.author,
      paperback:this.book.paperback,
     price:this.book.price,
      publisher:this.book.publisher,
     publicationdate:this.book.publicationdate,
      rating:this.book.rating,
      category:this.book.category,
      description:this.book.description,
      bookImgLink:this.book.bookImgLink
      }
     
      console.log("this new obj is ",obj)
      this.ds.userwishlist(obj).subscribe(
        res=>{
          if(res.message=="book already existed"){
            alert("book is already there in wishlist")
           
          }
          else{
            alert("book added to wishlist")
          }
         
        },
        err=>{
          alert("Something went wrong in Adding book")
        console.log(err)
        }
      )
     
    }
    else{
      alert("Please sign in to add to wishlist");
      this.router.navigateByUrl("/login");
    }

  }


 
}
