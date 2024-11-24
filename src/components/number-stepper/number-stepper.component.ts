import {
  Component, EventEmitter,
  Output,
  signal,
  WritableSignal,
  input
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

  readonly form = input(new NumberFormControl());
  readonly label = input("");
  @Output() quantityChanged = new EventEmitter<number>();

  handleUpdate($event: any) {
    const form = this.form();
    form.value = $event.target.value;
    this.quantityChanged.emit(form.value);
  }

  increment() {
    const form = this.form();
    if (this.form().value<this.form().max) {
      form.value = form.value + 1;
    }
    this.quantityChanged.emit(form.value);
  }

  decrement() {
    const form = this.form();
    if (this.form().value>this.form().min) {
      form.value = form.value - 1;
    }
    this.quantityChanged.emit(form.value);
  }
}
