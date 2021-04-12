import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  userObj;
  photo1;
  registerForm=new FormGroup({
      //userId
      userId:new FormControl({value:'',disabled:true}),
      //username
      username:new FormControl({value:'',disabled:true}),
      //email
      email:new FormControl(''),
      //password
      password:new FormControl(''),
      //phonenumber
      phonenumber:new FormControl(''),
      //address
      address:new FormControl(''),
      //city
      city:new FormControl(''),
      //state
      state:new FormControl(''),
      //pincode
      pincode:new FormControl('')

  });
  submitted=false;

  file!:File;
  username: any;

  incomingfile(event:any) {
    this.file= event.target.files[0];
  }

  constructor(private ds:DataService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getUserDetails()
    
  }

  getUserDetails(){
    this.ds.getUser(this.username).subscribe(
      res=>{
        if(res.message=="success"){
          this.registerForm=new FormGroup({
            userId:new FormControl(res.user.userId),
            username:new FormControl(res.user.username),          
            email:new FormControl(res.user.email),
            password:new FormControl(res.user.password),
            phonenumber:new FormControl(res.user.phonenumber),
            address:new FormControl(res.user.address),
            city:new FormControl(res.user.city),
            state:new FormControl(res.user.state),
            pincode:new FormControl(res.user.pincode)

          })

          this.photo1=res.user.userImgLink
          //console.log("the image link is",res.user.userImgLink)


          //this.userObj=res.user
          //console.log("the userprofile is ",res.user)
        }
        else{
          this.toastr.error(res.message)
    
          this.router.navigateByUrl("/login")

        }
      },
      err=>{
        this.toastr.error("something went wrong")
        console.log(err)
      }
    )
  }
  onSubmit(){
    let userObj=this.registerForm.value;

    //console.log("updated userprofile",userObj)

    let formData = new FormData();
 
    formData.append("userObj",JSON.stringify(userObj))
    console.log(userObj);

    this.ds.editprofile(formData).subscribe(
      res=>{
        if(res.message){
          this.toastr.success('User details are updated');
          this.router.navigateByUrl("/user/userdashboard")
        }
        else{
          this.toastr.warning('Cannot update profile check');
        }
        
      },
      err=>{
        this.toastr.error('Something went wrong in user creation');
        console.log(err)
      }
    
      )

  }


  cancel(){
    this.router.navigateByUrl('/user/userdashboard/userprofile')
  }

}
