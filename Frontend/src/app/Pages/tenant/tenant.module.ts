import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AuthGuard } from 'src/app/Guards/auth.guard';

///Components
import { TenantComponent } from './tenant.component';

//Primeng Imports
//primeNG 
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
import {ImageModule} from 'primeng/image';
import { DialogModule} from 'primeng/dialog';

const routes: Routes = [
  {path:'tenant', component: TenantComponent, canActivate: [AuthGuard],
  children:[
    {path:'', component: HomeComponent},
    {path:'profile/:userid', component: ProfileComponent},
    {path:'myroom', component: MyroomComponent},
    {path:'', redirectTo:'/tenant/', pathMatch:'full'},
  ]},
]

@NgModule({
  declarations: [
    TenantComponent,
    MyroomComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    Ng2SearchPipeModule,
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
    ToastModule,
    FormsModule,
    ImageModule,
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
    RouterModule.forChild(routes)
  ],
  providers: [ MessageService, ConfirmationService],
})
export class TenantModule { }
