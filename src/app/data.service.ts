import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private hc:HttpClient) { }


  //mounya
  createUser(userObj):Observable<any>{
    return this.hc.post("/user/register",userObj)

  }
  loginUser(userCredObj):Observable<any>{
    return this.hc.post("/user/login",userCredObj)

  }
  getUser(username):Observable<any>{
    return this.hc.get("/user/getuser/"+username)
  }
 
  //create new book
  addNewBook(obj):Observable<any>{
    //console.log("the data in ds is ",obj)
    return this.hc.post("/admin/addnewbook",obj)
  }

  //get all books
  getAllBooks():Observable<any>{
    return this.hc.get("/admin/getallbooks")
  }

  getBookDetails(book):Observable<any>{
    console.log("the book is ",book)
    return this.hc.get("/admin/bookdetails/"+book)
  }
    usercart(obj):Observable<any>{
      return this.hc.post("/cart/addto",obj);
    }

    getCartSize(username):Observable<any>{
      //console.log("the us is ",username);
      return this.hc.get("/cart/getsize/"+username);
    }
    getCartItems(username):Observable<any>{
      //console.log("the username is ",username)
      return this.hc.get("/cart/getcartitems/"+username);
    }
    deleteCartProduct(obj):Observable<any>{
      return this.hc.post("/cart/deleteproduct",obj);
    }
    userwishlist(obj):Observable<any>{
      return this.hc.post("/wishlist/addto",obj)
    }
    getWishlistItems(username):Observable<any>{
      return this.hc.get("/wishlist/getwishlistitems/"+username);
    }
    deleteWishlistProduct(obj):Observable<any>{
      return this.hc.post("/wishlist/deleteproduct",obj);
    }
  
}
