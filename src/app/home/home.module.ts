import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { BooksInCategoryComponent } from './books-in-category/books-in-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [
    HomeComponent, 
    BookdetailsComponent, 
    BooksInCategoryComponent,
    SearchPipe,
    CategoryComponent
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
