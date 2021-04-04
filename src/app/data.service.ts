import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private hc:HttpClient) { }


  //user services
  
  createUser(userObj):Observable<any>{
    return this.hc.post("/user/register",userObj)

  }
  loginUser(userCredObj):Observable<any>{
    return this.hc.post("/user/login",userCredObj)

  }
  getUser(username):Observable<any>{
    return this.hc.get("/user/getuser/"+username)
  }
  getAllUsers():Observable<any>{
    return this.hc.get("/user/getusers")
  }
  deleteUser(user):Observable<any>{
    //console.log(user)
    return this.hc.post("/user/deleteuser",user)
  }
  getCartItems(username):Observable<any>{
    console.log("the username is ",username)
    return this.hc.get("/cart/getcartitems/"+username);
  }

  usercart(obj):Observable<any>{
    return this.hc.post("/cart/addto",obj);
  }

  getCartSize(username):Observable<any>{
    //console.log("the us is ",username);
    return this.hc.get("/cart/getsize/"+username);
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

  editprofile(userObj):Observable<any>{
    console.log("obj in data sevice",userObj)
    return this.hc.put("/user/updateprofile",userObj)
  }


  //admin services-----------------------------------------------
 
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

  editBook(obj):Observable<any>{
    //console.log(obj," in ds")
    return this.hc.put("/admin/updatebook",obj)
  }
  
  deleteBook(obj):Observable<any>{
    console.log(obj," in ds")
    return this.hc.post("/admin/deletebook",obj);
  }

  categoryBooks(cat):Observable<any>{
    return this.hc.get("/admin/categorybooks/"+cat)
  }

}
