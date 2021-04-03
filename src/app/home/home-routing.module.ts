import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { BooksInCategoryComponent } from './books-in-category/books-in-category.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path:'', component:HomeComponent, children:[
    { path:"categorybooks",component:BooksInCategoryComponent},
    { path:"category",component:CategoryComponent}
  ]},
  { path:"bookdetails", component:BookdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
