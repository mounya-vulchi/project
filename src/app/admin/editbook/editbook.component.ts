import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  bookimg;
  bookdetails;

  registerForm=new FormGroup({
    booktitle:new FormControl({value:'',disabled:true}),
    author: new FormControl(''),
    paperback: new FormControl(''),
    price: new FormControl(''),
    publisher: new FormControl(''),
    publicationdate: new FormControl(''),
    rating: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl('')
  });
  submitted=false;

  file :File; 

  incomingfile(event:any) {
    this.file= event.target.files[0]; 
  }

  currentRate;

  constructor(private ds:DataService,private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.bookdetails=localStorage.getItem("book")
    this.getBookDetails();
  }

  getBookDetails(){
    this.ds.getBookDetails(this.bookdetails).subscribe(
      res=>{
        if(res.Details){
          this.registerForm=new FormGroup({
            booktitle:new FormControl(res.Details.booktitle),
            author: new FormControl(res.Details.author),
            paperback: new FormControl(res.Details.paperback),
            price: new FormControl(res.Details.price),
            publisher: new FormControl(res.Details.publisher),
            publicationdate: new FormControl(res.Details.publicationdate),
            rating: new FormControl(res.Details.rating),
            category: new FormControl(res.Details.category),
            description: new FormControl(res.Details.description)
          })
          this.bookimg=res.Details.bookImgLink;
        }
        else{
          this.toastr.warning(res.message)
        }
      },
      err=>{
        this.toastr.error("Something went Wrong in Book Details page")
        console.log(err);
      }
    )
  }

  onSubmit(){  
    let bookObj = this.registerForm.value;
    this.ds.editBook(bookObj).subscribe(
      res=>{
        if(res.message){
          this.toastr.success("Book details are updated to BookStore")
          this.router.navigateByUrl("/admin/allbooks")
        }
      },
      err=>{
        this.toastr.error("Something went wrong")
        console.log(err)
      }
    )}

deletebook(){
  this.ds.deleteBook(this.registerForm.value).subscribe(
    res=>{
      if(res.message){
        this.toastr.info("Book removed from BookStore")
        this.router.navigateByUrl("/admin/allbooks")
      }
    },
    err=>{
      this.toastr.error("Something went wrong in user creation");
      console.log(err);
    }
  )
}
getcontrol(){
  return this.registerForm.controls;
}
}
