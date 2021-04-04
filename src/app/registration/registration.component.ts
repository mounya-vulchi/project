import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({

  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  file!:File;

  incomingfile(event:any) {
    this.file= event.target.files[0];
  }
  registerForm:FormGroup;

  alert;
  alertmsg;
  closeAlert;

  constructor(private router:Router,private ds:DataService) { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({

      //username
      username:new FormControl(null,Validators.required),
      //email
      email:new FormControl(null,[Validators.required,Validators.pattern('.+@.+.com') ]),
      //password
      password:new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$')]),
      //phonenumber
      phonenumber:new FormControl(null,Validators.required),
      //address
      address:new FormControl(null,Validators.required),
      //city
      city:new FormControl(null,Validators.required),
      //state
      state:new FormControl(null,Validators.required),
      //pincode
      pincode:new FormControl(null,Validators.required)

    });
  }
  onSubmit(){
    let userObj=this.registerForm.value

    //console.log(userObj)

    let formData = new FormData();

    //adding image and other data to ForData object
    formData.append('photo',this.file,this.file.name);
 
    formData.append("userObj",JSON.stringify(userObj))
    console.log("the form data",formData)
    console.log("the user data",userObj);

    this.ds.createUser(formData).subscribe(
      res=>{
        if(res.message==="user existed"){
          this.alert=true;
              this.alertmsg="Username is already existed...choose another name";
              this.closeAlert=false;
                setTimeout(() => {
                  this.alert = false;
                  this.closeAlert = true;
                }, 3000);
          
          this.router.navigateByUrl("/userdashboard")
        }
        else{
          this.alert=true;
              this.alertmsg="Registeration sucessfull";
              this.closeAlert=false;
                setTimeout(() => {
                  this.alert = false;
                  this.closeAlert = true;
                }, 3000);
          this.router.navigateByUrl("/login")
        }
      },
      err=>{
        alert("Something went wrong in user creation");
        console.log(err)
      }
    
      )
  }

  login(){
    this.router.navigateByUrl("/login")
  }
}
