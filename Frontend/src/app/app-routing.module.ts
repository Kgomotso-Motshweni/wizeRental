import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './Guards/logged.guard';
import { HomeComponent } from './Pages/home/home.component';
import { LandlordComponent } from './Pages/landlord/landlord.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { TenantComponent } from './Pages/tenant/tenant.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'landlord', component:LandlordComponent},
  {path:'login', component:LoginComponent, canActivate:[LoggedGuard]},
  {path:'register', component:RegisterComponent, canActivate:[LoggedGuard]},
  {path:'tenant', component:TenantComponent},
  {path:'', redirectTo:"/", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

