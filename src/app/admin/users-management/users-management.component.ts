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
          for(let i=0;i<this.Users.length;i++){
          if(this.Users[i].userId=="3008"){
            this.Users.splice(i,1);
            i--;
          }
        }
        }
      },
      err=>{
        this.toastr.error('Something went wrong in getting user details');
        console.log(err)
      }
    )
  }

  delete(user){
    this.ds.deleteUser(user).subscribe(
      res=>{
        if(res.message){
          this.toastr.info("User removed successfully");
          this.router.navigateByUrl("/admin/usermanagement");
        }
      },
      err=>{
        this.toastr.error('Something went wrong in removing users');
        console.log(err)
      }
    )
  }

}
