import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId;
  userObj;

  constructor(private router:Router,private ds:DataService, private toastr:ToastrService,private spinner: NgxSpinnerService) { 

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  ngOnInit(): void {
    let userId=localStorage.getItem("userId")
    this.userObj=this.ds.getUser(userId).subscribe(
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
  showUserCart(){
    this.router.navigateByUrl("/userdashboard/usercart")
  }
  logout(){
   //clear local storage
   localStorage.clear();
   this.router.navigateByUrl("/login")
   .then(()=>{
    window.location.reload ();
   })
  }

}

