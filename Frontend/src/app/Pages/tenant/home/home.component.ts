import { Component, OnInit } from '@angular/core';
import { LandingPageService } from 'src/app/Services/landing-page.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: []
})
export class HomeComponent implements OnInit {
  tenantProperty:any
  searchItem:any;
  constructor(private service: LandingPageService, private __loader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.__loader.start();
    this.getProperty();
  }

  filter(){

  }

  // function that gets property
  getProperty(){
    this.service.getProperties().subscribe({
      next: (data: any) => {
          this.tenantProperty = data;
          this.__loader.stop();
        }
      }
    )
  }
}
