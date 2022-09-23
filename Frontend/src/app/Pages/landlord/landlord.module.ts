import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//Model for search and pagination
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

//Components
import { LandlordComponent } from './landlord.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PendingComponent } from './pending/pending.component';
import { TenantsComponent } from './tenants/tenants.component';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { HeaderComponent } from './header/header.component';
import { NortificationComponent } from './nortification/nortification.component';
import { MypropertyComponent } from './myproperty/myproperty.component';
import { FooterComponent } from './footer/footer.component';
import { SendNortificationComponent } from './send-nortification/send-nortification.component';


//Guards
import { AuthGuard } from 'src/app/Guards/auth.guard';
//Primeng Imports
//primeNG 
import { TableModule } from 'primeng/table';
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
import { SidebarModule } from 'primeng/sidebar';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';


const routes: Routes = [
  {path:'landlord', component: LandlordComponent,
  children:[
    {path:'', component: DashboardComponent},
    {path:'tenant', component: TenantsComponent},
    {path:'myproperty', component: MypropertyComponent},
    {path:'pending', component:PendingComponent},
    {path:'addproperty', component:AddpropertyComponent},
    {path:'sendNortification', component:SendNortificationComponent},
    {path:'', redirectTo:'/landlord/', pathMatch:'full'},
  ]}  
]

@NgModule({
  declarations: [
    DashboardComponent,
    AddpropertyComponent,
    TenantsComponent,
    LandlordComponent,
    PendingComponent,
    HeaderComponent,
    NortificationComponent,
    MypropertyComponent,
    FooterComponent,
    SendNortificationComponent
  ],
  imports: [
    Ng2SearchPipeModule,
    MultiSelectModule,
    //loader
     NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: false,
    }), 
    FormsModule,
    InputMaskModule,
    SidebarModule,
    ReactiveFormsModule,
    InputNumberModule,
    CommonModule,
    TableModule,
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

    RouterModule.forChild(routes)
  ],
  providers: [ MessageService, ConfirmationService],

})
export class LandlordModule { }

