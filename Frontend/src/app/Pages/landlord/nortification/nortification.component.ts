import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
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
  constructor(private receive:NortificationsService) {
    
    
   }

  
  ngOnInit(): void {
  }
  

}
