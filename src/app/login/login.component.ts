import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  constructor(private us:DataService,private router:Router) { }

  ngOnInit(): void {
  }
    
  onSubmit(formRef:any){
    let userCredObj=formRef.value;
    if(userCredObj.username=="admin" && userCredObj.password=="admin"){
      localStorage.setItem("username","admin")
        this.router.navigateByUrl("/admin")
    }
     
    //if user
    else{
        this.us.loginUser(userCredObj).subscribe(
          res=>{
            if(res["message"]=="success"){
              //store token and username in local storage
              localStorage.setItem("token",res["signedToken"])
              localStorage.setItem("username",res["username"])
  
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
