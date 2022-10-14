import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { AppRoutingModule } from './app-routing.module';
import { LandlordModule } from './Pages/landlord/landlord.module';
import { TenantModule } from './Pages/tenant/tenant.module';

////////////
//Imported PrimeNG module .
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule} from 'primeng/dialog';
import { ToggleButtonModule} from 'primeng/togglebutton';
//Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HomeComponent } from './Pages/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { ViewPropertyComponent } from './Pages/view-property/view-property.component';

//ngx loader
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { GenericListFilterModule } from 'generic-list-filter';// <-- import the module

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ViewPropertyComponent,
  ],
  imports: [
    GenericListFilterModule,
    ConfirmDialogModule,
    GenericListFilterModule,
    NgxUiLoaderModule,
    MessagesModule,
    InputNumberModule,
    LandlordModule,
    TenantModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    ToastModule,
    DialogModule,
    ToggleButtonModule,
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
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})

export class AppModule { }
