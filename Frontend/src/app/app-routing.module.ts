import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyComponent } from './Components/apply/apply.component';
import { HomeComponent } from './Pages/home/home.component';
import { LandlordComponent } from './Pages/landlord/landlord.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { TenantsComponent } from './Pages/tenants/tenants.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { ViewpropertyComponent } from './Pages/viewproperty/viewproperty.component';

const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'landlord', component:LandlordComponent},
    {path:'tenant', component:TenantsComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'apply', component:ApplyComponent},
    {path:'', redirectTo:"/", pathMatch:"full"},
    {path:'landing',component:LandingComponent},
    {path:'view', component:ViewpropertyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

