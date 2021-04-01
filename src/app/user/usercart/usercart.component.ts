import { Component, OnInit } from '@angular/core';
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
  

  
  constructor(private ds:DataService,private router:Router) { }



  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getCart();
    this.cartStatus();
 
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
 
  getCart(){
    this.ds.getCartItems(this.username).subscribe(
      res=>{
        this.cart=res.message
        //console.log("the cart items",this.cart)
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
  

}
