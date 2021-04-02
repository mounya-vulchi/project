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
  admin=false;
  booksArray=[];
  search;
  category;
  cat=false;
  constructor(private ds:DataService, private router:Router ) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    
    if(this.username=="Admin"){
      this.admin=true;
      //console.log(this.admin)
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

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
    window. location. reload ();
  } 

}
