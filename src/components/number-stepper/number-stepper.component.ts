import {
  Component,
  Input,
  signal,
  WritableSignal
} from "@angular/core";


export class NumberFormControl {

  _value: WritableSignal<number>;

  constructor(public min = 0, public max = 10) {
    this._value = signal(min)
  }

  get value(): number {
    return this._value() ?? this.min;
  }

  set value(val: number) {
    if (isNaN(val)||val>this.max)
      this._value.set(this.max);
    else if (val<this.min)
      this._value.set(this.min);
    else
      this._value.set(val);
  }

  get valid(): boolean {
    const val = this._value();
    if (val>=this.min && val<=this.max) {
      return true
    }
    return false;
  };

  reset() {
    this._value.set(this.min);
  }
}


@Component({
  selector: "number-stepper",
  templateUrl: "./number-stepper.component.html",
  styleUrl: "./number-stepper.component.scss",
  standalone: true,
  host: { 'style': 'display:block' },
})
export class NumberStepperComponent {

  @Input() form = new NumberFormControl()
  @Input() label = "";

  handleUpdate($event: any) {
    this.form.value = $event.target.value;
  }

  increment() {
    if (this.form.value<this.form.max) {
      this.form.value = this.form.value + 1;
    }
  }

  decrement() {
    if (this.form.value>this.form.min) {
      this.form.value = this.form.value - 1;
    }
  }
}
