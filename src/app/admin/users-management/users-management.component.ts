import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {

  Users=[];
  constructor(private ds:DataService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.ds.getAllUsers().subscribe(
      res=>{
        if(res.users){
          this.Users=res.users;
          //console.log(this.Users[1].username)
          for(let i=0;i<this.Users.length;i++){
          if(this.Users[i].username=="Admin"){
            this.Users.splice(i,1);
            //console.log(this.Users[i])
            i--;
          }
        }
        }
      },
      err=>{
        this.toastr.error("Something went wrong")
        console.log(err)
      }
    )
  }

  delete(user){
    //console.log(user);
    this.ds.deleteUser(user).subscribe(
      res=>{
        if(res.message){
          this.toastr.info("User removed successfully");
          this.router.navigateByUrl("/admin/usermanagement");
        }
      },
      err=>{
        this.toastr.error("Something went wrong")
        console.log(err)
      }
    )
  }

}
