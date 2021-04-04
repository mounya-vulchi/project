import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '../route.guard';
import { MyordersComponent } from './myorders/myorders.component';
import { PaymentComponent } from './payment/payment.component';
import { UserComponent } from './user.component';
import { UsercartComponent } from './usercart/usercart.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

const routes: Routes = [
  { path:"userdashboard", component: UserComponent,children:[
    { path:"usercart", component:UsercartComponent,canActivate:[RouteGuard]},
    { path:"userprofile",component:UserprofileComponent,canActivate:[RouteGuard]},
    { path:"wishlist",component:WishlistComponent,canActivate:[RouteGuard]},
    { path:"myorder", component:MyordersComponent,canActivate:[RouteGuard]},
    { path:"payment", component:PaymentComponent,canActivate:[RouteGuard]},
    {path:"editprofile",component:EditprofileComponent,canActivate:[RouteGuard]},
    { path:"",redirectTo:"/user/userdashboard/userprofile"}
  ],canActivate:[RouteGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
