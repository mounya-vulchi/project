import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private toastr:ToastrService){}
  canActivate(): boolean {

    //check token in local storage
    let token=localStorage.getItem("token")
    //if token is found , return false
    if(token==undefined){
      this.toastr.error("Unauthorized access")
      return false;
    }
    //else return true
    return true;
  }
  
}
