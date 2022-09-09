import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { LandlordModule } from './Pages/landlord/landlord.module';
import { TenantModule } from './Pages/tenant/tenant.module';

//Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { EditorComponent } from './Models/editor/editor.component';
import { HomeComponent } from './Pages/home/home.component';
import { ApplyComponent } from './Models/apply/apply.component';
import { MessageService } from 'primeng/api';
import { UploadComponent } from './Models/upload/upload.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    EditorComponent,
    HomeComponent,
    ApplyComponent,
    UploadComponent
    
  ],
  imports: [
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
    FormsModule 

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})

export class AppModule { }
