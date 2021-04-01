import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  username;
  admin=false;
  constructor(private router:Router){}

  ngOnInit(){
    this.username=localStorage.getItem("username")
    if(this.username=="Admin"){
      this.admin=true;
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  
}
