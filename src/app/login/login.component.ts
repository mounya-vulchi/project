import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  forgotForm:FormGroup;
  alert:boolean;
  alertmsg:string;
  closeAlert:boolean;
  close:boolean;

  constructor(private ds:DataService, private router:Router,private toastr:ToastrService) { 
    this.close=false;
  }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      username:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required),
    });
    this.forgotForm=new FormGroup({
      username:new FormControl(null,Validators.required),
      password:new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$')]),
      confirmpassword: new FormControl(null,Validators.required)
    })
    
  }
    
  onSubmit(){
    let userCredObj=this.loginForm.value
    
        this.ds.loginUser(userCredObj).subscribe(
          res=>{
            if(res.message==="success"){
              //store token and username in local storage
              localStorage.setItem("token",res.signedToken);
              localStorage.setItem("userId",res.userId);
              if(res.userId=="3008"){

                this.toastr.success(res.username,' Login success');
                this.router.navigateByUrl("/admin")
                .then(()=>{
                  window.location.reload ();
                 })
              }
              else{
              //navigate to user component
              this.toastr.success(res.username,' Login success');
              this.router.navigateByUrl("/home")
              .then(()=>{
                window.location.reload ();
               })
              }
            }
            else{
              this.alert=true;
              this.alertmsg=res.message;
              this.closeAlert=false;
                setTimeout(() => {
                  this.alert = false;
                  this.closeAlert = true;
                }, 3000);
              this.router.navigateByUrl("/login")
            }
          },
          err=>{
            this.toastr.warning("Something went wrong in user login");
            console.log(err)
          }
        )
  
}


regiser(){
  this.router.navigateByUrl("/register")
}


ChangePassword(){
  let Obj=this.forgotForm.value;
  
  if(Obj.password===Obj.confirmpassword){
    this.ds.changePassword(Obj).subscribe(
      res=>{
        if(res.message==="Password Reset Successfully"){
          this.toastr.success(res.message);
          this.close=true;
        }
        else{
          this.toastr.error(res.message);
        }
      },
      err=>{
        this.toastr.error("Something went wrong in password reset");
        console.log(err)
      })
    }
    else{
      this.toastr.error("Passwords doesn't matched");
    }
}

}
