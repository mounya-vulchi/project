import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewbookComponent } from './add-newbook/add-newbook.component';
import { AdminComponent } from './admin.component';
import { AvailableBooksComponent } from './available-books/available-books.component';
import { AvailableCategoriesComponent } from './available-categories/available-categories.component';
import { EditbookComponent } from './editbook/editbook.component';
import { UsersManagementComponent } from './users-management/users-management.component';

const routes: Routes = [
  { path:'',component:AdminComponent,children:[
    { path:'addbook',component:AddNewbookComponent},
    { path:'allbooks',component:AvailableBooksComponent},
    { path:'categories', component:AvailableCategoriesComponent},
    { path:"usermanagement",component:UsersManagementComponent},
    { path:"editbook",component:EditbookComponent},
    { path:"",redirectTo:"/admin/addbook",pathMatch:"full"}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
