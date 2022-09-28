import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  file: any = '';
  constructor(private auth:AuthenticationService, ) { }
  selectThisImage(myEvent: any) {
    this.file = myEvent.target.files[0]; 
  }
  ngOnInit(): void {
  }

}
