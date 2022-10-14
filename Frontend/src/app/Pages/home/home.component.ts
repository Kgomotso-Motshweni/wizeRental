import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LandingPageService } from 'src/app/Services/landing-page.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  searchItem:any;
  tenantProperty:any;
  display: boolean = false;  
  filter:any;
  copyData:any;
  town:any;
  name:any;
  accommodationType:any
  constructor(private service: LandingPageService, private __loader: NgxUiLoaderService, private formBuilder: FormBuilder) { }
  // function for getting all the properties 
  ngOnInit(): void {
    this.__loader.start();
    this.getProperty();
  }

  getProperty(){
    this.service.getProperties().subscribe({
      next: (data: any) => {
        this.tenantProperty = data;
        console.log(data);
        this.copyData = this.tenantProperty
        this.__loader.stop();
      }
    })
  }
}
