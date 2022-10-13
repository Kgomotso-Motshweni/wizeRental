import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import {NortificationsService} from 'src/app/Services/nortifications.service';

@Component({
  selector: 'app-nortification',
  templateUrl: './nortification.component.html',
  styleUrls: ['./nortification.component.scss']
})
export class NortificationComponent implements OnInit {

  token: any;
  id: any;
  myNotification: any;
  totalNumber: any;
  constructor(private notif:NortificationsService, private auth:AuthenticationService) {
 
   }

  ngOnInit(): void {
    // gets the token and parses the id of the person logged in so that they can be able to get notifications
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.id = this.token.regData[0].userid
    console.log(this.id);
    
    this.notif.tenantReceive(this.id).subscribe({
      next:data => {
        this.myNotification = data
        console.log(data)
        this.totalNumber = this.myNotification.length
      }
    })
  }
  
}
