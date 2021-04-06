import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-add-newbook',
  templateUrl: './add-newbook.component.html',
  styleUrls: ['./add-newbook.component.css']
})
export class AddNewbookComponent implements OnInit {


  registerForm:FormGroup;
  submitted=false;
  file :File; 

  incomingfile(event:any) {
    this.file= event.target.files[0]; 
  }

  currentRate=0;

  constructor(private ds:DataService, private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      //boottitle
      booktitle:new FormControl(null,Validators.required),
      //author
      author: new FormControl(null,Validators.required),
      //paperback
      paperback: new FormControl(null,Validators.required),
      //price
      price: new FormControl(null,Validators.required),
      //publisher'
      publisher: new FormControl(null,Validators.required),
      //publicationdate
      publicationdate: new FormControl(null,Validators.required),
      //rating
      rating: new FormControl(null, [Validators.required]),
      //category
      category: new FormControl(null,Validators.required),
      //description yourself
      description: new FormControl(null,[Validators.required,Validators.minLength(20)])
      
    });
  }

  onSubmit(){  
    let bookObj = this.registerForm.value;
    console.log(bookObj);
    let formData = new FormData();

    //console.log("file ",this.file)

   //adding image and other data to ForData object
   formData.append('photo',this.file,this.file.name);
 
   formData.append("bookObj",JSON.stringify(bookObj))
  
   this.ds.addNewBook(formData).subscribe(
    res=>{
      if(res.message == "Book already Existed"){
        this.toastr.warning("Product is already existed..choose another");
      }
      else{
        this.toastr.success(res.message)
        //navigate to allbooks component
        this.router.navigateByUrl("/admin/allbooks");
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
