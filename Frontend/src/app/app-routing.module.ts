import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyComponent } from './Models/apply/apply.component';
import { UploadComponent } from './Models/upload/upload.component';

const routes: Routes = [
  {path:'apply', component:ApplyComponent},
  {path:'upload', component:UploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

