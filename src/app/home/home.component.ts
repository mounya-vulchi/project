import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username;
  userCartSize;
  booksArray=[];
  search;
  constructor(private ds:DataService, private router:Router ) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.cartStatus();
  }

  goto(n){
    if(n==0){
      this.search="full stack developer";
    }
    else if(n==1){
      this.search="angularjs";
    }
    else if(n==2){
      this.search="modern javascript";
    }
    else if(n==3){
      this.search="nodejs";
    }
    else if(n==4){
      this.search="html,css & ";
    }
    if(n==5){
      this.search="mongodb";
    }
  }

  cartStatus(){
    this.ds.getCartSize(this.username).subscribe(
      res=>{
        this.userCartSize=res["cartsize"];
      },
      err=>{
        alert("Something went wrong in getting all products")
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
