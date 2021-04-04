import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

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
  constructor(private router:Router,private ds:DataService){}

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
            console.log(this.userObj);
          }
          else{
            alert(res.message)
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
  }
  
}
