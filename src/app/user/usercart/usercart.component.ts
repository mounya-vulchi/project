
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {


  userId:string;
  username:string;
  cart:any=[];
  booksArray:any=[];
  status:boolean;
  userCartSize:number;
  amount:number;

  constructor(private ds:DataService,private router:Router, private toastr:ToastrService, private spinner:NgxSpinnerService) {
    this.status=false;
  }

  ngOnInit(): void {
    this.userId=localStorage.getItem("userId");
    this.spinner.show();
    this.ds.getUser(this.userId).subscribe(
      res=>{
        this.username=res.user.username;
        this.spinner.hide();
      },
      err=>{
        this.toastr.error("Something went wrong in getting cart items");
        console.log(err);
      }
    )
    this.getCart();
    this.checkCart();
    this.cartStatus();
  }

  increment(b){
    if(b.quantity&&b.status=="Available"){
      let price=b.price/b.quantity;
    b.quantity+=1;

    b.price=b.quantity*price;
    this.totalamount();
    }

  }
  decrement(b){
    if(b.quantity!=1){
      let price=b.price/b.quantity;
      b.quantity-=1;
      
      b.price=b.quantity*price;
      this.totalamount();
      }
  
  }

  totalamount(){
    this.amount=0;
        for(let i=0;i<this.cart.length;i++){
          if(this.cart[i].status!="Unavailable"){
            let price=this.cart[i].price/this.cart[i].quantity;
            this.amount+=price*this.cart[i].quantity
          }

        }
  }

  getCart(){
    this.ds.getCartItems(this.userId).subscribe(
      res=>{
        this.cart=res.message;
        this.booksArray=res.booksArray;
        this.checkCart();
      },
      err=>{
        this.toastr.error("Something went wrong in Adding Course")
        console.log(err)
      }
    )
  
  }

  checkCart(){
    for(let i=0;i<this.cart.length;i++){
      for(let j=0;j<this.booksArray.length;j++){
        if(this.cart[i].booktitle==this.booksArray[j].booktitle){
          this.status=true;
          this.cart[i].status="Available";//adds status as available to the cart element
          console.log("available");
          break;
        }
      }
      if(this.cart[i].status!="Available"){
        this.cart[i].status="Unavailable";
        console.log("unavailable");
      }
    }
    this.totalamount();
  }

  cartStatus(){
    this.ds.getCartSize(this.userId).subscribe(
      res=>{
        this.userCartSize=res.cartsize;
        this.ds.setCartSubjectSize(res.cartsize);

      },
      err=>{
        this.toastr.error("Something went wrong in getting all products")
        console.log(err)
      }
    )


  }
  back(){
    this.router.navigateByUrl("user/userdashboard");

  }
  delete(n:number){
    let obj=this.cart[n];

    this.ds.deleteCartProduct(obj).subscribe(
      res=>{
        if(res.message){
          this.toastr.success("Product removed from usercart")
          window.location.reload ();
        }
      },
      err=>{
        this.toastr.error("Something went wrong in user creation");
        console.log(err);
      }
    )

  }
  goto(){
    this.router.navigateByUrl("/home/categorybooks")
  }
  payment(){
    this.toastr.success("You order has been placed successfully");
    for(let i=0;i<this.cart.length;i++){
      if(this.cart[i].status=="Available"){
        this.ds.addOrder(this.cart[i]).subscribe(
          res=>{
            console.log(res.message);
          }
        )
        this.ds.deleteCartProduct(this.cart[i]).subscribe(
          res=>{
            console.log(res.message);
          }
        )
      }
    }

  }
  
}
