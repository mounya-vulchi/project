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
  username;
  userObj;
  admin=false;
  constructor(private router:Router,private ds:DataService, private toastr:ToastrService,private spinner: NgxSpinnerService){
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

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
  }
  
}
