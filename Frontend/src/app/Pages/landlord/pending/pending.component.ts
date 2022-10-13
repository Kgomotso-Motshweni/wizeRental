import { Component, OnInit } from '@angular/core';
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
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class PendingComponent implements OnInit {
  pending: any;
  submitted: boolean = false;
  pendingClients: Pending = new Pending;
  condition:Boolean = false;
  token:any = '';
  id:number = 0;
  number:number = 0;
  roomNumber:number = 0;
  image:any;
  newRoomsAvailable:number = 0;
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
    private router:Router, private route: ActivatedRoute, private __loader: NgxUiLoaderService  ) { }

  ngOnInit(): void {
    this.__loader.start();
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
    this.dash.getPendTenants(user).subscribe({
      next:data  => {
          this.pending = data;          
          this.image = this.pending[0].id_doc
          this.roomNumber = this.pending[0].p_room
          this.newRoomsAvailable =this.roomNumber - 1;
          
          this.number = this.pending.length;
          this.__loader.stop();
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
/////////////////////////////////////////////
///////////Below Belong to NG-WIZARD //////////////

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

//////////////////// NG-Wirzad Ends here //////////////////////
///////////////////////////////////////////////////////////////

  declined(){

  }

  onSubmit(){
    this.submitted = true
    this.__loader.start();
    //Validate if the modal is empty do not submit
    // if(!this.pendingClients.unit || !this.pendingClients.amount || !this.pendingClients.agreementStart 
    //   || !this.pendingClients.agreementEnd || !this.pendingClients.paymentStart || !this.pendingClients.paymentEnd || !this.pendingClients.PaymentType){
    //     return 
    // }
      let user = {
        tenant_id: this.pendingClients.tenant_id,
        property_id: this.pendingClients.property_id,
        full_name: this.pendingClients.full_name,
        unit: this.pendingClients.unit,
        rent: this.pendingClients.amount,
        paymentstatus: false,
        moa_status: "notsigned",
        agreeStartDate: this.pendingClients.agreementStart,
        agreeEndDate: this.pendingClients.agreementEnd,
        payStartDate: this.pendingClients.paymentStart,
        payendDate: this.pendingClients.paymentEnd,
        agreementType: this.pendingClients.PaymentType
      }
      
      this.land.createMOA(user).subscribe({
        next:data => {
          this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
          this.router.onSameUrlNavigation = "reload";
          this.land.UpdateRooms(this.newRoomsAvailable, this.id).subscribe()
          this.router.navigate(['/landlord/pending'])
          this.__loader.stop();
          this.messageService.add({severity:'success', summary: 'Successful', detail: "Successfuly Accepted", life: 3000})
        },error: err => {
          //show the message if unable to add new data
          this.__loader.stop();
          this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message, life: 3000}) 
        }
      })
    }
}



