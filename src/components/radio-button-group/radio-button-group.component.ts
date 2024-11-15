import {Component, Input, OnInit, signal, WritableSignal} from "@angular/core";
import {NgClass} from "@angular/common";


/*
  This file is used to control the logic for the buttons on the https://www.morriswa.org/cmx/battleship/start webpage
  The radio buttons give the user the exact number of ships [1-5].
 */

  //
export type RadioButtonOptions = {
  value: any;
  label: string;
}

export class RadioButtonFormControl {

  _value: WritableSignal<RadioButtonOptions | undefined> = signal(undefined)

  constructor(public options: RadioButtonOptions[]) { }

  get value(): any {
    return this._value()?.value;
  }

  set value(value: any) {
    const opt = this.options.filter(op=>op.value === value);
    if (opt.length < 1) return;
    this._value.set(opt[0]);
  }

  get valid(): boolean {
    return !!this._value();
  };

  reset() {
    this._value.set(undefined);
  }
}

@Component({
  selector: "radio-button-group",
  templateUrl: "./radio-button-group.component.html",
  styleUrl: "./radio-button-group.component.scss",
  imports: [
    NgClass
  ],
  standalone: true,
  host: { 'class': 'flex-child' },
})
export class RadioButtonGroupComponent implements OnInit {
  @Input() public radioButtonFormControl!: RadioButtonFormControl;

  ngOnInit(): void {
    if (!this.radioButtonFormControl) throw new Error("radioButtonFormControl is required");
  }

  selectOption(button: RadioButtonOptions) {
    this.radioButtonFormControl._value.set(button);
  }
}
