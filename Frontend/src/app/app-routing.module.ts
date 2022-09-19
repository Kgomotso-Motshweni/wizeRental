import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPropertyComponent } from './Components/view-property/view-property.component';
import { ApplyComponent } from './Models/apply/apply.component';
import { HomeComponent } from './Pages/home/home.component';





const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'apply', component:ApplyComponent},
  {path: 'view-property', component: ViewPropertyComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

