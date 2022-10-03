import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { Pending } from 'src/app/Interfaces/pending';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { of } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LandlordService } from 'src/app/Services/landlord.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
  providers: [MessageService, ConfirmationService]
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
    private ngWizardService: NgWizardService, private formBuilder: FormBuilder,
    private land:LandlordService,  private messageService: MessageService,
    private router:Router, 
    private route: ActivatedRoute,  ) { }

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
    return this.Form.controls;//it traps errors in the form
  }

   //Pending Tenants
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
      // toolbarExtraButtons: [
      //   { text: 'Submit', class: 'btn btn-info', event: () => { alert("Completed!!"); } }
      // ],
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
    this.submitted = true

    
    //Validate if the modal is empty do not submit
    if(!this.pendingClients.unit || !this.pendingClients.amount || !this.pendingClients.agreementStart 
      || !this.pendingClients.agreementEnd || !this.pendingClients.paymentStart || !this.pendingClients.paymentEnd || !this.pendingClients.PaymentType){
        return 
    }
      let user = {
        tenant_id: this.pendingClients.tenant_id,
        property_id: this.pendingClients.property_id,
        full_name: this.pendingClients.full_name,
        unit: this.pendingClients.unit,
        rent: this.pendingClients.amount,
        paymentstatus: false,
        moa_status: "notSigned",
        agreeStartDate: this.pendingClients.agreementStart,
        agreeEndDate: this.pendingClients.agreementEnd,
        payStartDate: this.pendingClients.paymentStart,
        payendDate: this.pendingClients.paymentEnd,
        agreementType: this.pendingClients.PaymentType
      }
      console.log(user)
      this.loading = true;
      this.land.createMOA(user).subscribe({
        next:data => {
         
          this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
          this.router.onSameUrlNavigation = "reload";
          this.router.navigate(['/landlord/pending'])
          this.loading = false;
          this.messageService.add({severity:'success', summary: 'Successful', detail: "Successfuly Accepted", life: 3000})
        },error: err => {
          //show the message if unable to add new data
          this.loading = false;
          this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message, life: 3000}) 
        }
      })
    }
}
