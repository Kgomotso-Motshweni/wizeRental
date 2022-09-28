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
    phonenumber: new FormControl(''),
    age: new FormControl(''),
    uploadID: new FormControl(''),
    empStatus: new FormControl(''),
    viewDate: new FormControl(''),
    totOcc: new FormControl(''),
    petNum: new FormControl(''),
    petDesc: new FormControl(''),
    smoke: new FormControl(''),
   
  });

   dob: Date = new Date();

  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, 
   
    private router:Router) { }

    ngOnInit(): void {
      this.Form = this.formBuilder.group({
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phonenumber:  ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}'), Validators.maxLength(12)]],
        age: ['', Validators.required],
        UploadID: ['', Validators.required],
        EmpStatus: ['', Validators.required],
        viewDate: ['', Validators.required],
        totOcc: ['', ],
        petNum: ['', ],
        petDesc: ['', ],
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
  
      let user = {
        fname : this.Form.value.fname,
        lname: this.Form.value.lname,
        email: this.Form.value.email,
        phonenumber : this.Form.value.phonenumber,
        age : this.Form.value.age,
        UploadID : this.Form.value.UploadID,
        EmpStatus : this.Form.value.EmpStatus,
        viewDate: this.Form.value.viewDate,
        totOcc : this.Form.value.totOcc,
        petNum : this.Form.value.petNum,
        petDesc : this.Form.value.petDesc,
        smoke : this.Form.value.smoke,
      }
    }
  }
  
