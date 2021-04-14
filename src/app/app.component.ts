import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './data.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BookStore';
  userId;
  userCartSize;
  userObj;
  admin=false;
  constructor(private router:Router,private ds:DataService, private toastr:ToastrService,private spinner: NgxSpinnerService){
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  ngOnInit(){
    
    this.userId=localStorage.getItem("userId")
    this.cartStatus();
    if(this.userId=='3008'){
      this.admin=true;
    }
    if(this.userId!=null){
      this.userObj=this.ds.getUser(this.userId).subscribe(
        res=>{
          if(res.message=="success")
          {
            this.userObj=res.user;
          }
          else{
            this.toastr.error(res.message)
            //navigate login
            this.router.navigateByUrl("/login")
          }
        },
        err=>{
          this.toastr.error("something went wrong")
          console.log(err)
        }
      )
    }
  }

  cartStatus(){
    this.ds.getCartSize(this.userId).subscribe(
      res=>{
        this.ds.setCartSubjectSize(res.cartsize);
        this.userCartSize=res.cartsize;
        this.ds.getCartSubjectSize().subscribe(
          c=>{
            this.userCartSize=c;
        });
      },
      err=>{
        this.toastr.error("Something went wrong in getting all products")
        console.log(err)
      }
    )

  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
    window.location.reload ();
  } 
  
}
