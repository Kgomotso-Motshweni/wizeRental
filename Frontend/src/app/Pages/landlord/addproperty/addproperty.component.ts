import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.scss']
})
export class AddpropertyComponent implements OnInit {

  

  constructor(private ngWizardService: NgWizardService) {

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
  
  showPreviousStep(event?: Event) 
  {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) 
  {
    this.ngWizardService.next();

  }

  resetWizard(event?: Event) 
  {
    this.ngWizardService.reset();
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
  ngOnInit(): void {
    
  }
}

  // addPropertyForm = new FormGroup({
  //   location: new FormGroup({
  //     address: new FormControl('', [Validators.required, Validators.minLength(4)]),
  //     city: new FormControl('', Validators.required),
  //     town: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //     zipcode: new FormControl('', [Validators.required, Validators.minLength(4)])
  //   }),
  //   propertytype: new FormControl('', Validators.required),
  
  //   accomodationname: new FormControl('', Validators.required),
  //   description: new FormControl('', Validators.required),
  //   bedroom: new FormControl('', Validators.required),
  //   bathroom: new FormControl('', Validators.required),
  //   units: new FormControl('', Validators.required),
  //   price: new FormControl('', Validators.required),
  // })

  
