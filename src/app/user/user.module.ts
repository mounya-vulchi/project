import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UsercartComponent } from './usercart/usercart.component';
import { MyordersComponent } from './myorders/myorders.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PaymentComponent } from './payment/payment.component';
import { EditprofileComponent } from './editprofile/editprofile.component';


@NgModule({
  declarations: [
    UserComponent, 
    WishlistComponent, 
    UsercartComponent, 
    MyordersComponent, 
    UserprofileComponent, 
    PaymentComponent, EditprofileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
