
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

//order=[]
booksArray=[]
status;

  //order=[]
  

  
  constructor(private ds:DataService,private router:Router,private toastr: ToastrService) { }




  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getCart();
    this.cartStatus();

    ///this.totalamount()
    



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
        this.cart=res.message;
        this.booksArray=res.booksArray;
        //console.log("the cart items",this.cart)
         this.totalamount();
          this.checkCart();
        //console.log("the cart items",this.cart[i].price)
      },
      err=>{
        this.toastr.error("Something went wrong in Adding Course")
        console.log(err)
      }
    )
  
  }


  cartStatus(){
    this.ds.getCartSize(this.username).subscribe(
      res=>{
        this.userCartSize=res.cartsize;
        //console.log("the cart size is ",this.userCartSize)

      },
      err=>{
        this.toastr.error('Something went wrong in getting all products');
        console.log(err)
      }
    )


  }
  back(){
    this.router.navigateByUrl("user/userdashboard");

  }
  delete(n:number){
    let obj=this.cart[n];
    //console.log("the deleted obj is ",obj)

    this.ds.deleteCartProduct(obj).subscribe(
      res=>{
        if(res.message){

          this.toastr.success('Product removed from usercart');
          window. location. reload ();
        }
      },
      err=>{
        this.toastr.error('Something went wrong in user creation');
        //alert("Something went wrong in user creation");
        console.log(err);
      }
    )

  }
  goto(){
    this.router.navigateByUrl("/home/categorybooks")
  }

  additem(){
    this.router.navigateByUrl("/user/userdashboard/myorder")
  }




  checkCart(){
    for(let i=0;i<this.cart.length;i++){
      for(let j=0;j<this.booksArray.length;j++){
        if(this.cart[i].booktitle==this.booksArray[j].booktitle){
          this.status=true;
          console.log("available");
          break;
        }
      }
      if(!this.status){
        console.log("unavailable");
      }
    }
  }










  // additem(n){
  //   let i=0
  //   if(this.username!==null){

  //     for( i;i<this.cart.length;i++){

  //        this.order[i]=[{

  //           username:this.cart[i].username,
  //           booktitle:this.cart[i].booktitle,
  //          author:this.cart[i].author,
  //           paperback:this.cart[i].paperback,
  //          price:this.cart[i].price,
  //           publisher:this.cart[i].publisher,
  //          publicationdate:this.cart[i].publicationdate,
  //           rating:this.cart[i].rating,
  //           category:this.cart[i].category,
  //           description:this.cart[i].description,
  //           bookImgLink:this.cart[i].bookImgLink,
  //           quantity:this.cart[i].quantity
  //         }],


        
  //       console.log("the new order of i is",this.order[i])

  //       this.ds.userorder(this.order[i]).subscribe(
  //         res=>{
  //           if(res.message=="book already existed"){
  //             alert("book is already there in cart")
             
  //           }
  //           else{
  //             //this.toastr.success('book aded to my orders');
  //           }
           
  //         },
  //         err=>{
  //           this.toastr.error('Something went wrong in Adding book');
  //           //alert("Something went wrong in Adding book")
  //         console.log(err)
  //         }
  //       )


       
  //     }
      
  //   }

    



  //   this.toastr.success('Thanks for shopping!!', 'Payment done successfully');
  //   //alert("Thanks for shopping....Your order has been placed successfully!!")
  //   this.router.navigateByUrl("/user/userdashboard/myorder")
  // }
 
}
