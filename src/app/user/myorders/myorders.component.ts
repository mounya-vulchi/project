import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
userId:string;
username:string;
order=[]
  constructor(private ds:DataService,private router:Router,private toastr:ToastrService, private spinner:NgxSpinnerService) {}

  ngOnInit(): void {
    this.userId=localStorage.getItem("userId");
    this.spinner.show();
    this.ds.getUser(this.userId).subscribe(
      res=>{
        this.username=res.user.username;
        this.spinner.hide();
      },
      err=>{
        this.toastr.error("Something went wrong");
        console.log(err);
      }
    )
    this.getOrder();
  }

  getOrder(){
    this.spinner.show();
    this.ds.getOrder(this.userId).subscribe(
      res=>{
        this.order=res.message;
        this.spinner.hide();
      },
      err=>{
        this.toastr.error("Something went wrong in getting my orders")
        console.log(err)
      }
    )
  
  }
}
