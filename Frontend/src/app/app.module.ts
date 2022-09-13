import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { EditorComponent } from './Models/editor/editor.component';
import { HomeComponent } from './Pages/home/home.component';
import { LandlordComponent } from './Pages/landlord/landlord.component';
import { TenantsComponent } from './Pages/tenants/tenants.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ApplyComponent } from './Components/apply/apply.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { ViewpropertyComponent } from './Pages/viewproperty/viewproperty.component';
import { FilterByComponent } from './Components/filter-by/filter-by.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    EditorComponent,
    HomeComponent,
    LandlordComponent,
    TenantsComponent,
    LoginComponent,
    RegisterComponent,
    ApplyComponent,
    LandingComponent,
    ViewpropertyComponent,
    FilterByComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
