import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BookStore';
  username;
  userCartSize;
  userObj;
  admin=false;
  constructor(private router:Router,private ds:DataService, private toastr:ToastrService){}

  ngOnInit(){
    this.username=localStorage.getItem("username")
    if(this.username=="Admin"){
      this.admin=true;
    }
    if(this.username!=null){
      this.userObj=this.ds.getUser(this.username).subscribe(
        res=>{
          if(res.message=="success")
          {
            this.userObj=res.user;
            //console.log(this.userObj);
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
    this.cartStatus();
  }

  cartStatus(){
    this.ds.getCartSize(this.username).subscribe(
      res=>{
        this.userCartSize=res.cartsize;
      },
      err=>{
        this.toastr.error("Something went wrong in getting all products")
        console.log(err)
      }
    )

  }
  
}
