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
