
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {


  username;
  cart=[];
  userCartSize;
  bookdetails;
  total: any;
  amount
  

  
  constructor(private ds:DataService,private router:Router) { }




  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getCart();
    this.cartStatus();

    this.totalamount()
    



  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  increment(b){
    if(b.quantity){
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
          let price=this.cart[i].price/this.cart[i].quantity;
          this.amount+=price*this.cart[i].quantity

         //console.log("the cart price",this.cart[i].price)
        }
  }


 
  getCart(){
    this.ds.getCartItems(this.username).subscribe(
      res=>{
        this.cart=res.message
        console.log("the cart items",this.cart)
         this.amount=0;
        for(let i=0;i<this.cart.length;i++){

          this.amount+=this.cart[i].price*this.cart[i].quantity

          //console.log("the cart items",this.cart[i].price)
        }

      },
      err=>{
        alert("Something went wrong in Adding Course")
        console.log(err)
      }
    )
  
  }


  cartStatus(){
    this.ds.getCartSize(this.username).subscribe(
      res=>{
        this.userCartSize=res.cartsize;
        console.log("the cart size is ",this.userCartSize)

      },
      err=>{
        alert("Something went wrong in getting all products")
        console.log(err)
      }
    )


  }
  back(){
    this.router.navigateByUrl("user/userdashboard");

  }
  delete(n:number){
    let obj=this.cart[n];
    console.log("the deleted obj is ",obj)

    this.ds.deleteCartProduct(obj).subscribe(
      res=>{
        if(res.message){
          alert("Product removed from usercart")
          window. location. reload ();
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err);
      }
    )

  }
  goto(){
    this.router.navigateByUrl("/home/categorybooks")
  }
  payment(){
    alert("You order has been placed successfully")
  }

}
