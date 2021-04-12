import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private ds:DataService, private router:Router, private toastr:ToastrService) { }

  userObj;

  ngOnInit(): void {
    let userId=localStorage.getItem("userId")
    this.userObj=this.ds.getUser(userId).subscribe(
      res=>{
        if(res.message=="success")
        {
          this.userObj=res.user;
          //console.log(this.userObj)
        }
        else{
          this.toastr.error(res.message)
          //navigate login
          this.router.navigateByUrl("/login")

        }
      },
      err=>{
        this.toastr.error("something went wrong in user profile")
        console.log(err)
      }
    )
  }

  back(){
    this.router.navigateByUrl("/user/userdashboard")
  }
  edit(){
    this.router.navigateByUrl("/user/userdashboard/editprofile")
  }


}
