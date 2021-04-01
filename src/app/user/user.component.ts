import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username;
  userObj;

  constructor(private router:Router,private ds:DataService) { }

  ngOnInit(): void {
    //this.username=localStorage.getItem("username")
    let username=localStorage.getItem("username")
    this.userObj=this.ds.getUser(username).subscribe(
      res=>{
        if(res["message"]=="success")
        {
          this.userObj=res["user"]
          console.log(this.userObj)
        }
        else{
          alert(res["message"])
          //navigate login
          this.router.navigateByUrl("/login")

        }
      },
      err=>{
        alert("something went wrong")
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
   //navigate to home
   this.router.navigateByUrl("/home")
  }

}

