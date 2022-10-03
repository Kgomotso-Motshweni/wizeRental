import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { Pending } from 'src/app/Interfaces/pending';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { of } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})

export class PendingComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  pending: any;
  submitted: boolean = false;
  pendingClients: Pending = new Pending;
  condition:Boolean = false;
  token:any = '';
  id:number = 0;
  number:number = 0;

  Form = new FormGroup({
    address: new FormControl(''),
    town: new FormControl(''),
    city: new FormControl(''),
    zipCode: new FormControl(''),
    unitNumber: new FormControl(''),
    accomName: new FormControl(''),

    fullName: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    age: new FormControl(''),
    employeeStatus: new FormControl(''),
    totalNumber: new FormControl(''),
    numPets: new FormControl(''),
    smoke: new FormControl(''),
    id: new FormControl(''),
  });

  constructor(private dash: DashboardService, private auth:AuthenticationService,
    private ngWizardService: NgWizardService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.loading = true;
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.id = this.token.regData[0].userid;
    this.getPending(this.id);
 
    this.Form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required],
      age: ['', Validators.required],
      employeeStatus: ['', Validators.required],
      totalNumber: ['', Validators.required],
      numPets: ['', Validators.required],
      smoke: ['', Validators.required],
      id: ['', Validators.required],
      accomName: ['', Validators.required],
      address: ['', Validators.required],
      town: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      unitNumber: ['', Validators.required],
    });
  }

  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;////it traps errors in the form
  }

   ////Pending Tenants
   getPending(user:number){
    this.dash.getPendTenants(1).subscribe({
      next:data  => {
     
          this.pending = data;
          this.number = this.pending.length;
          this.loading = false;
        }
      }
    )
   }
  
  //hide the Form
  hideInsertform(){
    this.condition = false;
    this.submitted = false;
  }

  //reuse the form for editing 
  editProperty(details:Pending) {
    this.condition = true;
    this.pendingClients = {...details}
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
      //// toolbarExtraButtons: [
      ////   { text: 'Submit', class: 'btn btn-info', event: () => { alert("Completed!!"); } }
      //// ],
      showPreviousButton: false,
      showNextButton: false 
    }
  };
  
  showPreviousStep() 
  {
    this.ngWizardService.previous();
  }

  showNextStep() 
  {
    this.submitted = true;
    this.ngWizardService.next();
  }

  setTheme(theme: THEME) 
  {
    this.ngWizardService.theme(theme);
  }
    stepChanged(args: StepChangedArgs) 
  {

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

  declined(){

  }

  onSubmit(){
    this.submitted = true;
    if(this.Form.invalid){

      this.loading = false;
      return
    }
    this.loading = false;
  }
}




