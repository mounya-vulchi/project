import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private hc:HttpClient) { }

  //user services
  
  createUser(userObj):Observable<any>{
    return this.hc.post("/user/register",userObj);
  }
  loginUser(userCredObj):Observable<any>{
    return this.hc.post("/user/login",userCredObj);
  }
  changePassword(obj):Observable<any>{
    return this.hc.post("/user/passwordreset",obj);
  }
  getUser(userId):Observable<any>{
    return this.hc.get("/user/getuser/"+userId);
  }
  getAllUsers():Observable<any>{
    return this.hc.get("/user/getusers");
  }
  deleteUser(user):Observable<any>{
    return this.hc.post("/user/deleteuser",user);
  }
  getCartItems(userId):Observable<any>{
    return this.hc.get("/cart/getcartitems/"+userId);
  }

  usercart(obj):Observable<any>{
    return this.hc.post("/cart/addto",obj);
  }

  getCartSize(userId):Observable<any>{
    return this.hc.get("/cart/getsize/"+userId);
  }

  deleteCartProduct(obj):Observable<any>{
    return this.hc.post("/cart/deleteproduct",obj);
  }
  userwishlist(obj):Observable<any>{
    return this.hc.post("/wishlist/addto",obj)
  }
  getWishlistItems(userId):Observable<any>{
    return this.hc.get("/wishlist/getwishlistitems/"+userId);
  }
  deleteWishlistProduct(obj):Observable<any>{
    return this.hc.post("/wishlist/deleteproduct",obj);
  }

  editprofile(userObj):Observable<any>{
    return this.hc.put("/user/updateprofile",userObj)
  }
   //myorders services--------------------
   addOrder(book):Observable<any>{
    return this.hc.post("/myorders/addorder",book)
  }
  getOrder(userId):Observable<any>{
    return this.hc.get("/myorders/getorderitems/"+userId)
  }


  //admin services-----------------------------------------------
 
  //create new book
  addNewBook(obj):Observable<any>{
    return this.hc.post("/admin/addnewbook",obj)
  }

  //get all books
  getAllBooks():Observable<any>{
    return this.hc.get("/admin/getallbooks")
  }

  getBookDetails(book):Observable<any>{
    return this.hc.get("/admin/bookdetails/"+book)
  }

  editBook(obj):Observable<any>{
    return this.hc.put("/admin/updatebook/"+obj,obj)
  }
  
  deleteBook(obj):Observable<any>{
    return this.hc.post("/admin/deletebook",obj);
  }

  categoryBooks(cat):Observable<any>{
    return this.hc.get("/admin/categorybooks/"+cat)
  }

  //usercartsize-------------------------
  cartsize=0;
  //create Object to BehaviourSubject with initial value of cartsize
  private cartSubject: BehaviorSubject<any> = new BehaviorSubject(this.cartsize);

    getCartSubjectSize(): Observable<any> {
        return this.cartSubject.asObservable();
    }

    setCartSubjectSize(cartsize: any) {
        this.cartSubject.next(cartsize);
    }
}
