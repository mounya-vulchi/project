import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private hc:HttpClient, private router:Router) { }

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
  
}
