import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { LoggedGuard } from './Guards/logged.guard';
import { HomeComponent } from './Pages/home/home.component';
import { LandlordComponent } from './Pages/landlord/landlord.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { ViewpropertyComponent } from './Pages/viewproperty/viewproperty.component';
import { FilterByComponent } from './Components/filter-by/filter-by.component';
import { TenantComponent } from './Pages/tenant/tenant.component';

const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'landlord', component:LandlordComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'landing',component:LandingComponent},
    {path:'view/:id', component:ViewpropertyComponent},
    {path: 'filter', component:FilterByComponent},
    {path:'tenant', component:TenantComponent},
    {path:'', redirectTo:"/", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

