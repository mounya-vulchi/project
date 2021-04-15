import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  bookimg:string;
  bookid:string;

  registerForm=new FormGroup({
    bookid:new FormControl({value:'',disabled:true}),
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
  submitted:boolean;
  file :File; 

  incomingfile(event:any) {
    this.file= event.target.files[0]; 
  }
  currentRate:number;

  constructor(private ds:DataService,private router:Router, private toastr:ToastrService, private spinner:NgxSpinnerService) {
    this.submitted=false;
   }

  ngOnInit(): void {
    this.bookid=localStorage.getItem("book")
    this.getBookDetails();
  }

  getBookDetails(){
    this.spinner.show();
    this.ds.getBookDetails(this.bookid).subscribe(
      res=>{
        if(res.Details){
          this.registerForm=new FormGroup({
            bookid:new FormControl(res.Details.bookid),
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
          this.spinner.hide();
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
    this.spinner.show();
    this.ds.deleteBook(this.registerForm.value).subscribe(
      res=>{
        if(res.message){
          this.toastr.info("Book removed from BookStore")
          this.router.navigateByUrl("/admin/allbooks")
        }this.spinner.hide();
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
  cancel(){
    this.router.navigateByUrl('/admin/allbooks')
  }
}
