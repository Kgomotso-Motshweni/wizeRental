import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './Guards/logged.guard';
import { HomeComponent } from './Pages/home/home.component';
import { LandlordComponent } from './Pages/landlord/landlord.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { FilterByComponent } from './Components/filter-by/filter-by.component';
import { TenantComponent } from './Pages/tenant/tenant.component';
import { SinglePropertyComponent } from './Pages/tenant/single-property/single-property.component';



const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'view-property/:id', component: SinglePropertyComponent},
  {path:'landlord', component:LandlordComponent},
  {path:'login', component:LoginComponent, canActivate:[LoggedGuard]},
  {path:'filter', component:FilterByComponent},
  {path:'register', component:RegisterComponent,  canActivate:[LoggedGuard]},
  {path:'tenant', component:TenantComponent},
  {path:'', redirectTo:"/", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

