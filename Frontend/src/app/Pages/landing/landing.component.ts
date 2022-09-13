import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingService } from 'src/app/Services/landing.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
 properties:any;
 property:any;

 form!: FormGroup;
  constructor(private serv:LandingService, private router: Router, private route: ActivatedRoute, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form= new FormGroup({
      accName: new FormControl(''),
      bathrooms: new FormControl(''),
      address: new FormControl(''),
      rooms: new FormControl(''),
    });

    this.serv.getProperties().subscribe(
      {
        next: (data: any) => {
          console.log(data);
          this.property = data;
        }
      })



  }

  // get details of the room

  getProperty(numP: any) {

    console.log(this.property[numP].id)
    this.serv.getProperty(this.property[numP].id).subscribe(
      (added: any) => {
        console.log(added[0]);
        
      }
    );

  }


}
