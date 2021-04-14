import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userId:string;
  admin:boolean;
  constructor(private router:Router){
    this.admin=false;
  }

  ngOnInit(){
    this.userId=localStorage.getItem("userId");
    console.log(this.userId);
    if(this.userId=="3008"){
      this.admin=true;
    }
    else{
      this.router.navigateByUrl("/home");
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login")
    .then(()=>{
      window.location.reload ();
     })
    
  }
  
}
