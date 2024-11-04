import {Component, computed, inject, Signal, signal, WritableSignal} from "@angular/core";
import {
  RadioButtonFormControl,
  RadioButtonGroupComponent
} from "src/components/radio-button-group/radio-button-group.component";
import {NgIf} from "@angular/common";
import {DialogRef} from "@angular/cdk/dialog";
import {
  CheckboxSelectorComponent,
  CheckboxSelectorFormControl
} from "src/components/checkbox-selector/checkbox-selector.component";


@Component({
  selector: "app-taste-questionnaire",
  templateUrl: "./coffee-questionnaire.component.html",
  imports: [
    RadioButtonGroupComponent,
    NgIf,
    CheckboxSelectorComponent
  ],
  standalone: true
})
export class CoffeeQuestionnaireComponent {

  PAGE_COUNT = 9;

  ref = inject(DialogRef);

  page: WritableSignal<number> = signal(0);
  forwardDisabled: Signal<boolean> = computed(()=>this.page()>=this.PAGE_COUNT);
  backwardDisabled: Signal<boolean> = computed(()=>this.page()<=1);
  pageOneCoffeeStrengthForm: CheckboxSelectorFormControl = new CheckboxSelectorFormControl([
    { value: 'bold', label: 'Bold' },
    { value: 'medium', label: 'Medium' },
    { value: 'mild', label: 'Mild' },
  ]);
  pageTwoFlavoredCoffeeForm: RadioButtonFormControl = new RadioButtonFormControl([
    { value: 'y', label: 'Yes, I love flavor varieties.' },
    { value: 'n', label: 'No, I like to enjoy my coffee without additives' },
    { value: 'np', label: 'I love all coffee!!' },
  ]);
  pageThreeCreamersForm: CheckboxSelectorFormControl = new CheckboxSelectorFormControl([
    { value: 'black', label: 'Black Coffee' },
    { value: 'milk', label: 'Coffee with Milk' },
    { value: 'sweet', label: 'Coffee with Sweeteners' },
    { value: 'sweetmilk', label: 'Coffee with Milk and Sweeteners' },
  ]);
  pageFourCoffeeTimeForm: CheckboxSelectorFormControl = new CheckboxSelectorFormControl([
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'night', label: 'Night' },
  ])
  pageFiveFlavorNotesForm: CheckboxSelectorFormControl = new CheckboxSelectorFormControl([
    { value: 'nutty', label: 'Nutty' },
    { value: 'fruity', label: 'Fruity' },
    { value: 'earthy', label: 'Earthy' },
    { value: 'floral', label: 'Floral' },
    { value: 'chocolate', label: 'Chocolate' },
  ])
  pageSixSingleOriginForm: RadioButtonFormControl = new RadioButtonFormControl([
    { value: 'so', label: 'Single Origin' },
    { value: 'bl', label: 'Blend' },
    { value: 'np', label: 'I love all coffee!!' },
  ]);
  pageSevenCoffeeToolForm: CheckboxSelectorFormControl = new CheckboxSelectorFormControl([
    { value: 'espresso', label: 'Espresso Machine' },
    { value: 'drip', label: 'Drip' },
    { value: 'french', label: 'French Press' },
    { value: 'pour', label: 'Pour Over' },
    { value: 'perc', label: 'Percolator' },
    { value: 'cold', label: 'Cold Brew' },
    { value: 'air', label: 'Airopress' },
  ])

  forward() {
    const cur = this.page();
    if (cur < this.PAGE_COUNT) {
      this.page.set(cur + 1);
    }
  }

  backward() {
    const cur = this.page();
    if (cur > 1) {
      this.page.set(cur - 1);
    }
  }

  handleSubmit() {
    this.ref.close({
      'strength': this.pageOneCoffeeStrengthForm.value,
      'flavored': this.pageTwoFlavoredCoffeeForm.value,
      'creamers': this.pageThreeCreamersForm.value,
      'time_of_day': this.pageFourCoffeeTimeForm.value,
      'tasting_notes': this.pageFiveFlavorNotesForm.value,
      'origins': this.pageSixSingleOriginForm.value,
      'tools': this.pageSevenCoffeeToolForm.value
    })
  }
}
