import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingService } from 'src/app/Services/landing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // property:any;
  properties:any;

  searchItem: any;
  constructor() { }

  form!: FormGroup;
  ngOnInit(): void {
    this.form= new FormGroup({
      accName: new FormControl(''),
      bathrooms: new FormControl(''),
      address: new FormControl(''),
      rooms: new FormControl(''),
    });

    // this.serv.getProperties().subscribe(
    //   {
    //     next: (data: any) => {
    //       console.log(data);
    //       this.property = data;
    //     }
    //   })



  }

  // get details of the room

  // getEmp(numP: any) {

  //   console.log(this.property[numP].id)
  //   this.serv.getProperty(this.property[numP].id).subscribe(
  //     (added: any) => {
  //       console.log(added[0]);
        
  //     }
  //   );

  // }

}
