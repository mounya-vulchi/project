import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

<<<<<<< HEAD
  constructor(private ds:DataService, private router:Router) { }
=======
  

  constructor(private us:DataService,private router:Router) { }
>>>>>>> Pujitha

  ngOnInit(): void {
  }
    
  onSubmit(formRef:any){
    let userCredObj=formRef.value;
    if(userCredObj.username=="admin" && userCredObj.password=="admin"){
<<<<<<< HEAD
      //localStorage.setItem("username","admin")
=======
      localStorage.setItem("username","admin")
>>>>>>> Pujitha
        this.router.navigateByUrl("/admin")
    }
     
    //if user
    else{
<<<<<<< HEAD
        this.ds.loginUser(userCredObj).subscribe(
          res=>{
            if(res["message"]==="success"){
=======
        this.us.loginUser(userCredObj).subscribe(
          res=>{
            if(res["message"]=="success"){
>>>>>>> Pujitha
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
