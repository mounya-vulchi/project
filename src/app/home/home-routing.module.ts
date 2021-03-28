import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { BooksInCategoryComponent } from './books-in-category/books-in-category.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path:'', component:HomeComponent, children:[
    { path:"bookdetails", component:BookdetailsComponent},
    { path:"categorybooks",component:BooksInCategoryComponent},
    { path:"",redirectTo:"/home/categorybooks",pathMatch:"full"}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
