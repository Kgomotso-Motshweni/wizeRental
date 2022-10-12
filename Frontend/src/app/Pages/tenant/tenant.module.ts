import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ConfirmDialog} from 'primeng/confirmdialog';
import { AuthGuard } from 'src/app/Guards/auth.guard';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
///Components
import { TenantComponent } from './tenant.component';

//Primeng Imports
//primeNG 
import { ButtonModule } from "primeng/button";
import { BadgeModule } from "primeng/badge";
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MyroomComponent } from './myroom/myroom.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ImageModule} from 'primeng/image';
import { DialogModule} from 'primeng/dialog';
import { SinglePropertyComponent } from './single-property/single-property.component'; 
import { CheckboxModule} from 'primeng/checkbox'; 
import { SidebarModule } from 'primeng/sidebar';
import { NortificationComponent } from './nortification/nortification.component';
import { GenericListFilterModule } from 'generic-list-filter';


const routes: Routes = [
  {path:'tenant', component: TenantComponent, canActivate:[AuthGuard],
  children:[
    {path:'', component: HomeComponent},
    {path:'profile/:userid', component: ProfileComponent},
    {path: 'single-property/:id', component: SinglePropertyComponent},
    {path:'myroom', component: MyroomComponent},
    {path:'', redirectTo:'/tenant/', pathMatch:'full'},

  ]},
]

@NgModule({
  declarations: [
    TenantComponent,
    MyroomComponent,
    ProfileComponent,
    HomeComponent,
    SinglePropertyComponent,
    NortificationComponent,
  ],
  imports: [
    Ng2SearchPipeModule,
    ButtonModule,
    NgxUiLoaderModule,
    BadgeModule,
    GenericListFilterModule,
    //loader
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
    ToastModule,
    FormsModule,
    ImageModule,
    CheckboxModule,
    AvatarModule,
    AvatarGroupModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    MessagesModule,
    SidebarModule,
    DialogModule,
    RouterModule.forChild(routes)
  ],
  providers: [ MessageService, ConfirmationService],
})
export class TenantModule { }
