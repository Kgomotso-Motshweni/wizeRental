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
import {TabViewModule} from 'primeng/tabview';
import { MultiSelectModule } from 'primeng/multiselect';
import {BadgeModule} from 'primeng/badge';

//NgWizard Imports
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default,
};

const routes: Routes = [
  {path:'landlord', component: LandlordComponent, canActivate:[AuthGuard],
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
    SendNortificationComponent,
  ],
  imports: [
    NgxUiLoaderModule.forRoot({
			overlayColor: "rgba(0,0,0,0.85)",
			logoPosition: "center-center",
			textPosition: "center-center",
			bgsPosition: "center-center",
			fgsPosition: "center-center",
			bgsType: "wandering-cubes",
			masterLoaderId: "master",
			overlayBorderRadius: "0",
			fgsType: "three-strings",
			hasProgressBar: false,
			textColor: "#33b5e5",
			bgsColor: "#33b5e5",
			fgsColor: "#33b5e5",
			pbDirection: "ltr",
			pbColor: "#33b5e5",
			text: "Loading...",
			fastFadeOut: true,
			bgsOpacity: 0.4,
			pbThickness: 3,
			logoSize: 120,
			bgsSize: 80,
			logoUrl: "",
			fgsSize: 80,
			delay: 0,
			blur: 15,
			gap: 10,
    }),
    Ng2SearchPipeModule,
    MultiSelectModule,
    BadgeModule,
    //ng-wizard
    NgWizardModule.forRoot(ngWizardConfig),
    //loader
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
    TabViewModule,

    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [ MessageService, ConfirmationService],

})
export class LandlordModule { }

