import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  book:any=[];
  bookid:string;
  userId:string;
  admin:boolean;
  userCartSize:number;
  constructor(private ds:DataService, private router:Router, private toastr:ToastrService, private spinner:NgxSpinnerService) { 
    this.admin=false;
  }

  ngOnInit(): void {
    this.userId=localStorage.getItem("userId");
    if(this.userId=="3008"){
      this.admin=true;
    }
    this.bookid=localStorage.getItem("book");
    this.getBookDetails();
    this.cartStatus();
  }

  getBookDetails(){
    this.spinner.show();
    this.ds.getBookDetails(this.bookid).subscribe(
      res=>{
        if(res.Details){
          this.book=res.Details;
        }
        else{
          this.toastr.error(res.message);
        }this.spinner.hide();
      },
      err=>{
        this.toastr.error("Something went Wrong in Book Details page");
        console.log(err);
      }
    )
  }
  cartStatus(){
    this.ds.getCartSize(this.userId).subscribe(
      res=>{
        this.userCartSize=res.cartsize;
        this.ds.setCartSubjectSize(res.cartsize);
      },
      err=>{
        this.toastr.error("Something went wrong in getting all products");
        console.log(err);
      }
    )

  }

  additem(book){
    if(this.userId!==null&&this.userId!=="Admin"){
      let obj={
      userId:this.userId,
      booktitle:this.book.booktitle,
      author:this.book.author,
      paperback:this.book.paperback,
      price:this.book.price,
      publisher:this.book.publisher,
      publicationdate:this.book.publicationdate,
      rating:this.book.rating,
      category:this.book.category,
      description:this.book.description,
      bookImgLink:this.book.bookImgLink,
      quantity:1,
      }
     
      this.spinner.show();
      this.ds.usercart(obj).subscribe(
        res=>{
          if(res.message=="book already existed"){
            this.toastr.warning("Book is already there in cart");
          }
          else{
            this.toastr.success("Book added to cart");
            this.cartStatus();
          }
          this.spinner.hide();
        },
        err=>{
          this.toastr.error("Something went wrong in Adding book");
          console.log(err);
        }
      )
     
    }
    else{
      this.toastr.warning("Please sign in to add to cart");
      this.router.navigateByUrl("/login");
    }
   
  }

  wishlist(book){
    this.spinner.show();
    if(this.userId!==null&&this.userId!=="Admin"){
      let obj={
      userId:this.userId,
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
            this.toastr.warning("book is already there in wishlist");
           
          }
          else{
            this.toastr.success("book added to wishlist");
          }
          this.spinner.hide();
        },
        err=>{
          this.toastr.error("Something went wrong in Adding book");
          console.log(err);
        }
      )
     
    }
    else{
      this.toastr.warning("Please sign in to add to wishlist");
      this.router.navigateByUrl("/login");
    }

  }


 
}
