import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
username;
order=[]
  constructor(private ds:DataService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username");
    this.getOrder()
  }

  getOrder(){
    this.ds.getOrder(this.username).subscribe(
      res=>{
        this.order=res.message;

      },
      err=>{
        this.toastr.error("Something went wrong in getting my orders")
        console.log(err)
      }
    )
  
  }
  
}
