import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import { Pending } from 'src/app/Interfaces/pending';
import { retry } from 'rxjs';

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
  btnStatus ="disabled"
  isFormEmpty = false;

  clicked = false;

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

    if(this.submitted==null)
    {
      alert("Can't submit an empty form");
    }
    if (this.Form.value.full_name === ""  || this.Form.value.full_name == null ||
      this.Form.value.email === "" || this.Form.value.email == null ||
      this.Form.value.phone_num === ""  ||this.Form.value.phone_num == null ||
      this.Form.value.age === ""  ||this.Form.value.age == null ||
      this.Form.value.file === ""  ||this.Form.value.file == null ||
      this.Form.value.occupation === "" || this.Form.value.occupation == null ||
      this.Form.value.view_date === "" || this.Form.value.view_date == null ||
      this.Form.value.num_tenants === "" || this.Form.value.num_tenants == null ||
      this.Form.value.num_pets === "" || this.Form.value.num_pets == null ||
      this.Form.value.ped_desc === "" || this.Form.value.ped_desc == null ||
      this.Form.value.smoke === "" || this.Form.value.smoke == null ) 
      {
        this.isFormEmpty = true;
    }
    else{

      true
      this.formData.append('full_name', this.Form.value.full_name + '  '+ this.Form.value.lname)
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
    }

    console.log(this.formData)

    console.log(this.Form.value.fname + '   ' + this.Form.value.lname )
    console.log(this.Form.value.email )
    console.log(this.Form.value.phone_num)
    console.log(this.Form.value.age)
    console.log(this.Form.value.id_doc )
    console.log(this.Form.value.occupation)
    console.log(this.Form.value.view_date )
    console.log(this.Form.value.num_tenants )
    console.log(this.Form.value.num_pets)
    console.log(this.Form.value.ped_desc )
    console.log(this.Form.value.smoke )

  }


actionMethod(){

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
