import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username;
  userObj;
  userCartSize;
  admin=false;
  booksArray=[];
  search;
  category;
  cat=false;
  constructor(private ds:DataService, private router:Router,private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.cartStatus();
    
    if(this.username=="Admin"){
      this.admin=true;
      //console.log(this.admin)
    }
    if(this.username!=null){
      this.userObj=this.ds.getUser(this.username).subscribe(
        res=>{
          if(res.message=="success")
          {
            this.userObj=res.user;
            console.log(this.userObj);
          }
          else{

            this.toastr.success(res.message);
            //alert(res.message)
            //navigate login
            this.router.navigateByUrl("/login")
          }
        },
        err=>{
          this.toastr.error('something went wrong')
          //alert("something went wrong")
          console.log(err)
        }
      )
    }
  }

  goto(n){
    this.cat=true;
    if(n==0){
      this.category="full stack developer";
    }
    else if(n==1){
      this.category="angularjs";
    }
    else if(n==2){
      this.category="modern javascript";
    }
    else if(n==3){
      this.category="nodejs";
    }
    else if(n==4){
      this.category="html, css & rwd";
    }
    if(n==5){
      this.category="mongodb";
    }
  }

  cartStatus(){
    this.ds.getCartSize(this.username).subscribe(
      res=>{
        this.userCartSize=res["cartsize"];
      },
      err=>{
        this.toastr.error('Something went wrong in getting all products')
        //alert("Something went wrong in getting all products")
        console.log(err)
      }
    )

  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
    window. location. reload ();
  } 

}
