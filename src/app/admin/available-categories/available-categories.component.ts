import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-available-categories',
  templateUrl: './available-categories.component.html',
  styleUrls: ['./available-categories.component.css']
})
export class AvailableCategoriesComponent implements OnInit {

  searchTerm:String;
  categories:any=[];
  books:any;
  constructor(private ds:DataService, private router:Router, private toastr:ToastrService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.ds.getAllBooks().subscribe(
      res=>{
        this.books=res.booksarray;
        this.categories=[...new Set(this.books.map(x=>x.category))];
        this.spinner.hide();
      },
      err=>{
        this.toastr.error("something went wrong");
          console.log(err);
      }
    )
  }

  bookDetails(book){
    localStorage.setItem("book",book.bookid);
    this.router.navigateByUrl("/admin/editbook/"+book.bookid);
  }
}
