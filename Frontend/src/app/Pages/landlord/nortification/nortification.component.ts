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

  token:any = '';
  totalNumber: number = 0;
  userInfo:any;

  constructor(private receive:NortificationsService, private auth:AuthenticationService,) {
   }

   

  ngOnInit(): void {
    this.loading = false;
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    let id = this.token.regData[0].userid ;

    this. notification(id)
  }
  
  notification(userId:number){
    this.receive.landlordReceive(userId).subscribe({
      next:data => {
        this.userInfo = data;
        console.log(data);
        
      }
    })
  }


}
