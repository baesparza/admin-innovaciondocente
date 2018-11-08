import { Component, Input } from '@angular/core';

@Component({
  selector: 'id-stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.scss']
})
export class StepperFormComponent {

  @Input() canBack: boolean = true;
  @Input() canContinue: boolean = true;
  @Input() continueMessage: String = "Siguiente";
  @Input() backMessage: String = "Anterior";
  @Input() continue: Function = null;
  @Input() back: Function = null;

  constructor() { }

}
