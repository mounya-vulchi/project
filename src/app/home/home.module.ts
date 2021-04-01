import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { BooksInCategoryComponent } from './books-in-category/books-in-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';
import { NgbModule, NgbRating } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HomeComponent, 
    BookdetailsComponent, 
    BooksInCategoryComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class HomeModule { }
