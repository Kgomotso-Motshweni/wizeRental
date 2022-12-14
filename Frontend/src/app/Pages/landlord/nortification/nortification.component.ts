import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import {NortificationsService} from 'src/app/Services/nortifications.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-nortification',
  templateUrl: './nortification.component.html',
  styleUrls: ['./nortification.component.scss']
})
export class NortificationComponent implements OnInit {
  token:any = '';
  totalNumber: number = 0;
  myNotification:any;
  userInfo:any;
  id:any;

  constructor(private receive:NortificationsService, private auth:AuthenticationService, private __loader: NgxUiLoaderService) {
   }

  ngOnInit(): void {
// gets the token and parses the id of the person logged in so that they can be able to get notifications
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    let id = this.token.regData[0].userid ;
    this. notification(id)
  
  }
notification(userId:number){
  this.receive.landlordReceive(userId).subscribe({
    next:data => {
      this.userInfo = data;
      this.myNotification  = this.userInfo.length
    }
  })
}
}

  