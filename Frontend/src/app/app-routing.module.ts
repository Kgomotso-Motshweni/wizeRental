import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './Guards/logged.guard';
import { HomeComponent } from './Pages/home/home.component';
import { LandlordComponent } from './Pages/landlord/landlord.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { TenantComponent } from './Pages/tenant/tenant.component';
import { ViewPropertyComponent } from './Pages/view-property/view-property.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'view-property/:id', component: ViewPropertyComponent},
  {path:'landlord', component:LandlordComponent},
  {path:'login', component:LoginComponent, },
  {path:'register', component:RegisterComponent,},
  {path:'tenant', component:TenantComponent},
  {path:'', redirectTo:"/", pathMatch:"full"},
  {path: 'LandingComponent' ,component:LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

