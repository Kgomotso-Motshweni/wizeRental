import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { LoggedGuard } from './Guards/logged.guard';
import { ApplyComponent } from './Components/apply/apply.component';
import { HomeComponent } from './Pages/home/home.component';
import { LandlordComponent } from './Pages/landlord/landlord.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'landlord', component:LandlordComponent, canActivate:[AuthGuard]},
    {path:'login', component:LoginComponent, canActivate:[LoggedGuard]},
    {path:'register', component:RegisterComponent, canActivate:[LoggedGuard]},
    {path:'apply', component:ApplyComponent},
    {path:'', redirectTo:"/", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

