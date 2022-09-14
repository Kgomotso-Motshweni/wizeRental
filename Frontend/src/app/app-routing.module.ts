import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPropertyComponent } from './Components/view-property/view-property.component';
import { ApplyComponent } from './Models/apply/apply.component';





const routes: Routes = [
  {path:'apply', component:ApplyComponent},
  {path: 'view-property', component: ViewPropertyComponent}
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

