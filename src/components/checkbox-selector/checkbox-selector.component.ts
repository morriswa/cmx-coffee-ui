import {Component, OnInit, signal, WritableSignal, input, Output, EventEmitter} from "@angular/core";
import {NgClass} from "@angular/common";


export type CheckboxSelectorOptions = {
  value: any;
  label: string;
}


export class CheckboxSelectorFormControl {

  _value: WritableSignal<CheckboxSelectorOptions[]> = signal([])

  constructor(public options: CheckboxSelectorOptions[]) { }

  get value(): any[] {
    return this._value().map((v=>v.value));
  }

  set value(values: any[]) {
    const opt = this.options.filter(op=>values.includes(op.value));
    if (opt.length < 1) return;
    this._value.set(opt);
  }

  get valid(): boolean {
    return !!this._value();
  };

  reset() {
    this._value.set([]);
  }
}



@Component({
    selector: "app-checkbox-selector",
    templateUrl: "./checkbox-selector.component.html",
    styleUrl: "./checkbox-selector.component.scss",
    imports: [
        NgClass
    ],
    host: { 'class': 'flex-child' }
})
export class CheckboxSelectorComponent {
  @Output() onChange = new EventEmitter<null>();

  public readonly checkboxSelectorFormControl = input.required<CheckboxSelectorFormControl>();

  toggleOption(button: CheckboxSelectorOptions) {
    this.checkboxSelectorFormControl()._value.update(val=>{
      if (val.includes(button)) {
        return val.filter((v=>v.value!==button.value));
      } else {
        val.push(button);
        return val;
      }
    });
    this.onChange.emit()
  }
}
