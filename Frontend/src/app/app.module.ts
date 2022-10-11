import {NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { Ng2SearchPipeModule } from 'ng2-search-filter'

import { AppRoutingModule } from './app-routing.module';
import { LandlordModule } from './Pages/landlord/landlord.module';
import { TenantModule } from './Pages/tenant/tenant.module';


////////////
//Imported PrimeNG module .
import { BadgeModule } from "primeng/badge";
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule} from 'primeng/dialog';
import { ToggleButtonModule} from 'primeng/togglebutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import { GenericListFilterModule } from 'generic-list-filter';

//Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { EditorComponent } from './Models/editor/editor.component';
import { HomeComponent } from './Pages/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { ViewPropertyComponent } from './Pages/view-property/view-property.component';

//
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    EditorComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    FooterComponent,
    ViewPropertyComponent,
  ],
  imports: [
    
    ConfirmDialogModule,
    GenericListFilterModule,
    NgxUiLoaderModule,
    SelectButtonModule,
    InputTextModule,
    MessagesModule,
    InputNumberModule,
    BadgeModule,
    InputMaskModule,
    LandlordModule,
    TenantModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule,
    CalendarModule,
    Ng2SearchPipeModule,
    FormsModule,
    DropdownModule,
    ToastModule,
    DialogModule,
    ToggleButtonModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: false,
    }),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})

export class AppModule { }
