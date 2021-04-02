import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { AddNewbookComponent } from './add-newbook/add-newbook.component';
import { AvailableBooksComponent } from './available-books/available-books.component';
import { AvailableCategoriesComponent } from './available-categories/available-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryPipe } from '../category.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditbookComponent } from './editbook/editbook.component';



@NgModule({
  declarations: [
    AdminComponent, 
    UsersManagementComponent, 
    AddNewbookComponent, 
    AvailableBooksComponent, 
    AvailableCategoriesComponent, 
    EditbookComponent,
    CategoryPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ]
})
export class AdminModule { }
