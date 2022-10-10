//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

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
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';;
import { SidebarModule } from 'primeng/sidebar';
import { MultiSelectModule } from 'primeng/multiselect';
import { BadgeModule} from 'primeng/badge';

//NgWizard Imports and ngxloader
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
    FormsModule,
    InputMaskModule,
    SidebarModule,
    ReactiveFormsModule,
    InputNumberModule,
    CommonModule,
    ToastModule,
		DialogModule,
    ConfirmDialogModule,
    RouterModule.forChild(routes),
  ],
  providers: [ MessageService, ConfirmationService],

})
export class LandlordModule { }

