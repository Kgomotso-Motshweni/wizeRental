import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.scss']
})
export class AddpropertyComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  

  Form = new FormGroup({
    address: new FormControl(''),
    town: new FormControl(''),
    city: new FormControl(''),
    zipCode: new FormControl(''),
    options: new FormControl(''),
    accomName: new FormControl(''),
    description: new FormControl(''),
    numBeds: new FormControl(''),
    numBaths: new FormControl(''),
    numRooms: new FormControl(''),
    price: new FormControl(''),
    petFriendly: new FormControl(''),
    houseImage: new FormControl(''),
    tittleDeed: new FormControl(''),
  });

  submitted:boolean = false; 
  preview: string = '';
  message: any;
  file: any;
  formData = new FormData();

  constructor(private ngWizardService: NgWizardService, private formBuilder: FormBuilder, ) {

  }

  ngOnInit(): void {
    this.loading = false;
    this.Form = this.formBuilder.group({
      address: ['', Validators.required],
      town: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      options: ['', Validators.required],
      accomName: ['', Validators.required],
      description: ['', Validators.required],
      numBeds: ['', Validators.required],
      numBaths: ['', Validators.required],
      numRooms: ['', Validators.required],
      price: ['', Validators.required],
      petFriendly: ['', Validators.required],
      houseImage: ['', Validators.required],
      tittleDeed: ['', Validators.required],
    }
    );
  }

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      // toolbarExtraButtons: [
      //   { text: 'Submit', class: 'btn btn-info', event: () => { alert("Completed!!"); } }
      // ],
      // showPreviousButton: false,
     
      
    }
  };
  
  showPreviousStep() 
  {
    this.ngWizardService.previous();
  }

  showNextStep() 
  {
    this.submitted = true;
    if(this.Form.invalid){
      return
    }

    this.ngWizardService.next();
  }

  setTheme(theme: THEME) 
  {
    this.ngWizardService.theme(theme);
  }
  stepChanged(args: StepChangedArgs) 
  {
    console.log(args.step);
    
  }
  isValidTypeBoolean: boolean = true;
  isValidFunctionReturnsBoolean(args: StepValidationArgs) 
  {
    return true;
  }
  isValidFunctionReturnsObservable(args: StepValidationArgs) 
  {
    return of(true);
  }
 

  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;//it traps errors in the form
  }

  houseImage(event:any) {
    const image = (event.target as any ).files[0];
    this.file = image
  }


  proofOfOnwership(event:any) {
    const image = (event.target as any ).files[0];
    this.file = image
  }

  OnSubmit(){
    this.submitted = true;
    if(this.Form.invalid){
      return
    }
  }
}