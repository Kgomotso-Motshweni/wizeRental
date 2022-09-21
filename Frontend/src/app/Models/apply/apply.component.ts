import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

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
  formData = new FormData();
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  file: any;

  constructor(private formBuilder: FormBuilder, 
   
    private router:Router) { }

    ngOnInit(): void {
      this.Form = this.formBuilder.group({
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone_num:  ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}'), Validators.maxLength(12)]],
        age: ['', Validators.required],
        id_doc: ['', Validators.required],
        occupation: ['', Validators.required],
        view_date: ['', Validators.required],
        num_tenants: ['', ],
        num_pets: ['', ],
        ped_desc: ['', ],
        smoke: ['', ],
      },
      );
    }
  
    get f():{ [key: string]: AbstractControl }{
      return this.Form.controls;
    }
  
  
  
    onSubmit():void{
      this.submitted = true;
      let usertype = this.Form.value.usertype;
      let status = true;
  
      this.formData.append('full_name', this.Form.value.fname + '  '+ this.Form.value.lname)
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

    handleFileInput(event:any) {
      const image = (event.target as any ).files[0];
      this.file = image
    }
  
  }
  
