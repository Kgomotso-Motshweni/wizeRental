import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TenantsComponent } from '../landlord/tenants/tenants.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandlordComponent } from './landlord.component';
import { PendingComponent } from './pending/pending.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


//Primeng Imports
//primeNG 
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule, } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';


const routes: Routes = [
  {path:'landlord', component: LandlordComponent,
  children:[
    {path:'dashbord', component: DashboardComponent},
    {path:'tenants', component: TenantsComponent},
    {path:'addproperty', component: AddpropertyComponent},
    {path: 'pending', component: PendingComponent},
    {path:'', redirectTo:'/landlord/dashbord', pathMatch:'full'},
  ]},
]

@NgModule({
  
  declarations: [
    AddpropertyComponent,
    DashboardComponent,
    TenantsComponent,
    PendingComponent,
    LandlordComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserAnimationsModule,
    CardModule,
    FormsModule,
    InputMaskModule,
    ReactiveFormsModule,
    InputNumberModule,
    CommonModule,
    CardModule,
    ToastModule,
    PaginatorModule,
    DialogModule,
    DropdownModule,
    ButtonModule,
    ProgressBarModule,
    InputTextModule,
    ConfirmDialogModule,
    MessagesModule,
    Ng2SearchPipeModule,

    RouterModule.forChild(routes)
  ],
  providers: [ MessageService, ConfirmationService],
})


export class LandlordModule { }
