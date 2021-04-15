import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouteGuard } from './route.guard';


const routes: Routes = [ 
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[RouteGuard]}, 
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path:"user", loadChildren:()=>import('./user/user.module').then(m=> m.UserModule),canActivate:[RouteGuard]},
  { path:"login", component:LoginComponent},
  { path:"register", component:RegistrationComponent},
  { path:"",redirectTo:"/home",pathMatch:"full"},
  { path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
