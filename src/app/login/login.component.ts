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
  alert:boolean;
  alertmsg:string;
  closeAlert:boolean;

  constructor(private ds:DataService, private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({

      //username
      username:new FormControl(null,Validators.required),
      
      //password
      password:new FormControl(null,Validators.required),

    });
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

}
