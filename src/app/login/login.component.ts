import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import{FormControl,FormGroup,Validators} from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm:FormGroup;


  constructor(private ds:DataService, private router:Router) { }

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
    if(userCredObj.username=="admin" && userCredObj.password=="admin"){
      localStorage.setItem("username","admin")
        this.router.navigateByUrl("/admin")
    }
     
    //if user
    else{
        this.ds.loginUser(userCredObj).subscribe(
          res=>{
            if(res.message==="success"){
              //store token and username in local storage
              localStorage.setItem("token",res.signedToken)
              localStorage.setItem("username",res.username)
  
              //navigate to user component
              this.router.navigateByUrl("/home")
            }
            else{
              alert(res["message"])
              this.router.navigateByUrl("/login")
            }
          },
          err=>{
            alert("Something went wrong in user login")
            console.log(err)
          }
        )
  
      }
  
      
    }
    regiser(){
      this.router.navigateByUrl("/register")
    }

}
