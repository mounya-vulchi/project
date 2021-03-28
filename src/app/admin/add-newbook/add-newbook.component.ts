import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-add-newbook',
  templateUrl: './add-newbook.component.html',
  styleUrls: ['./add-newbook.component.css']
})
export class AddNewbookComponent implements OnInit {

  file :File; 

  incomingfile(event:any) {
    this.file= event.target.files[0]; 
  }

  currentRate=0;

  constructor(private ds:DataService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(formRef){   
    let bookObj = formRef.value;
    console.log(bookObj);
    let formData = new FormData();

    //console.log("file ",this.file)

   //adding image and other data to ForData object
   formData.append('photo',this.file,this.file.name);
 
   formData.append("bookObj",JSON.stringify(bookObj))
  
   this.ds.addNewBook(formData).subscribe(
    res=>{
      if(res["message"] == "Book already Existed"){
        alert("Product is already existed..choose another");
      }
      else{
        alert("Product Added Successfully");

        //navigate to login component
        this.router.navigateByUrl("/admin/allbooks");
      }
    },
    err=>{
      alert("Something went wrong in user creation");
      console.log(err);
    }  
  )
   
}

}
