import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import {NortificationsService} from 'src/app/Services/nortifications.service';

@Component({
  selector: 'app-nortification',
  templateUrl: './nortification.component.html',
  styleUrls: ['./nortification.component.scss']
})
export class NortificationComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  token: any;
  id: any;
  myNotification: any;
  totalNumber: any;
  constructor(private notif:NortificationsService, private auth:AuthenticationService) {
 
   }

  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.id = this.token.regData[0].userid

    this.notif.tenantReceive(this.id).subscribe({
      next:data => {
        
        this.myNotification = data
        this.totalNumber = this.myNotification.length
      }
    })
  }
  
}
