import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.scss']
})
export class AddpropertyComponent {

  constructor(private ngWizardService: NgWizardService){
    
  }
 stepStates = {
  normal: STEP_STATE.normal,
  disabled: STEP_STATE.disabled,
  error: STEP_STATE.error,
  hidden: STEP_STATE.hidden
};
config: NgWizardConfig = {
  selected: 0,
  theme: THEME.arrows ,
  toolbarSettings: {
    toolbarExtraButtons: [
      { text: 'Submit', class: 'btn btn-info', event: () => { alert("Completed!!"); } }
    ],
  }
};
showPreviousStep(event?: Event) {
  this.ngWizardService.previous();
}
showNextStep(event?: Event) {
  this.ngWizardService.next();
}
resetWizard(event?: Event) {
  this.ngWizardService.reset();
}
setTheme(theme: THEME) {
  this.ngWizardService.theme(theme);
}
stepChanged(args: StepChangedArgs) {
  console.log(args.step);
}
isValidTypeBoolean: boolean = true;
isValidFunctionReturnsBoolean(args: StepValidationArgs) {
  return true;
}
isValidFunctionReturnsObservable(args: StepValidationArgs) {
  return of(true);
}

}
