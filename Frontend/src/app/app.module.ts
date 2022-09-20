import {NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AppRoutingModule } from './app-routing.module';
import { LandlordModule } from './Pages/landlord/landlord.module';
import { TenantModule } from './Pages/tenant/tenant.module';

////////////
// Imported Syncfusion Signature module from inputs package.


//Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { EditorComponent } from './Models/editor/editor.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

//Primeng Imports
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from './Components/footer/footer.component';
import {ToggleButtonModule} from 'primeng/togglebutton';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    EditorComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
  ],
  imports: [
    LandlordModule,
    TenantModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    HttpClientModule,
    ToastModule,
    DialogModule,
    ButtonModule,
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
