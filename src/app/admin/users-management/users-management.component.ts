import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {

  Users=[];
  constructor(private ds:DataService, private router:Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.ds.getAllUsers().subscribe(
      res=>{
        if(res.users){
          this.Users=res.users;
          //console.log(this.Users)
        }
      },
      err=>{
        alert("Something went wrong")
        console.log(err)
      }
    )
  }

}
