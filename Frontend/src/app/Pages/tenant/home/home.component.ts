import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  file: any = '';
  constructor(private auth:AuthenticationService, ) { }
  selectThisImage(myEvent: any) {
    this.file = myEvent.target.files[0]; 
  }
  ngOnInit(): void {
  }

}
