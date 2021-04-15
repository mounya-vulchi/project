import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId:string;
  userObj:Object;
  userCartSize:number;
  admin:boolean;
  search:string;
  category:string;
  cat:boolean;

  constructor(private ds:DataService, private router:Router, private toastr:ToastrService,private spinner: NgxSpinnerService) { 
    this.admin=false;
    this.cat=false;
  }

  ngOnInit(): void {
    this.userId=localStorage.getItem("userId")
    
    if(this.userId=="3008"){
      this.admin=true;

    }
    if(this.userId!=null){
      this.spinner.show();
      this.userObj=this.ds.getUser(this.userId).subscribe(
        res=>{
          if(res.message=="success")
          {
            this.userObj=res.user;
            this.spinner.hide();
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

 

}
