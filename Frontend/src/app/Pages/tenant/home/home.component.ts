import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import { Pending } from 'src/app/Interfaces/pending';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class HomeComponent implements OnInit {
  // file: any = '';

  Form = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    phone_num: new FormControl(''),
    age: new FormControl(''),
    id_doc: new FormControl(''),
    occupation: new FormControl(''),
    view_date: new FormControl(''),
    num_tenants: new FormControl(''),
    num_pets: new FormControl(''),
    ped_desc: new FormControl(''),
    smoke: new FormControl(''),
   
  });

  dob: Date = new Date();
  appForm: Pending = new Pending
  formData = new FormData();
  submitted = false;
  displayApplicationForm: boolean = false;
  firstName: string = '';
  lastName: string = '';
  errorMessage = '';
  file: any;

  

  constructor(
    private auth:AuthenticationService,
    private formBuilder: FormBuilder,
    private router:Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }

  selectThisImage(myEvent: any) {
    this.file = myEvent.target.files[0]; 
  }

  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_num:  ['', [Validators.required, Validators.maxLength(12)]],
      age: ['', Validators.required],
      id_doc: ['', Validators.required],
      occupation: ['', Validators.required],
      view_date: ['', Validators.required],
      num_tenants: ['', Validators.required],
      num_pets: ['', Validators.required],
      ped_desc: ['', Validators.required],
      smoke: ['', Validators.required],
    },
    );
  }

  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;
  }



  onSubmit():void{
    this.submitted = true;

    this.formData.append('full_name', this.appForm.full_name + '  '+ this.Form.value.lname)
    this.formData.append('email', this.Form.value.email)
    this.formData.append('phone_num', this.Form.value.phone_num)
    this.formData.append('age', this.Form.value.age)
    this.formData.append('id_doc', this.file)
    this.formData.append('occupation', this.Form.value.occupation)
    this.formData.append('view_date', this.Form.value.view_date)
    this.formData.append('num_tenants', this.Form.value.num_tenants)
    this.formData.append('num_pets', this.Form.value.num_pets)
    this.formData.append('ped_desc', this.Form.value.ped_desc)
    this.formData.append('smoke', this.Form.value.smoke)

    console.log(this.formData)

    console.log(this.appForm.full_name + '   ' + this.appForm.last_name )
    console.log(this.appForm.email )
    console.log(this.appForm.phone_num)
    console.log(this.appForm.age)
    console.log(this.appForm.id_doc )
    console.log(this.appForm.occupation)
    console.log(this.appForm.view_date )
    console.log(this.appForm.num_tenants )
    console.log(this.appForm.num_pets)
    console.log(this.appForm.ped_desc )
    console.log(this.appForm.smoke )

  }


  showBasicDialog() {
    this.appForm = {}
    this.displayApplicationForm = true;
    this.submitted = false;
  }

  hideDialog() {

    this.displayApplicationForm = false;
    this.submitted = false;
  }

  handleFileInput(event:any) {
    const image = (event.target as any ).files[0];
    this.file = image
  }


}
