import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPropertyComponent } from './Components/view-property/view-property.component';
import { LoggedGuard } from './Guards/logged.guard';
import { ApplyComponent } from './Models/apply/apply.component';
import { HomeComponent } from './Pages/home/home.component';
import { LandlordComponent } from './Pages/landlord/landlord.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { TenantComponent } from './Pages/tenant/tenant.component';



const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'apply', component:ApplyComponent},
  {path: 'view-property', component: ViewPropertyComponent},
  {path:'landlord', component:LandlordComponent},
  {path:'login', component:LoginComponent, },
  {path:'register', component:RegisterComponent, },
  {path:'tenant', component:TenantComponent},
  {path:'', redirectTo:"/", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

