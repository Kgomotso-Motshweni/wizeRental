import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LandlordComponent } from './Pages/landlord/landlord.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

// const routes: Routes = [
//     {path:'', component:HomeComponent},
//     {path:'landlord', redirectTo:'/landlord/dashboard', pathMatch:'full'},
//     {path:'login', component:LoginComponent},
//     {path:'register', component:RegisterComponent},
//     {path:'dash',component:DashboardComponent},
//     {path:'', redirectTo:"/", pathMatch:"full"},
// ];

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'landlord',component:LandlordComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'', redirectTo:"/", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

