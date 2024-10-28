import {Component, computed, inject, Signal, signal, WritableSignal} from "@angular/core";
import {
  RadioButtonFormControl,
  RadioButtonGroupComponent
} from "src/components/radio-button-group/radio-button-group.component";
import {NgIf} from "@angular/common";
import {DialogRef} from "@angular/cdk/dialog";


@Component({
  selector: "app-taste-questionnaire",
  templateUrl: "./taste-questionnaire.component.html",
  imports: [
    RadioButtonGroupComponent,
    NgIf
  ],
  standalone: true
})
export class TasteQuestionnaireComponent {

  PAGE_COUNT = 9;

  ref = inject(DialogRef);

  page: WritableSignal<number> = signal(1);
  forwardDisabled: Signal<boolean> = computed(()=>this.page()>=this.PAGE_COUNT);
  backwardDisabled: Signal<boolean> = computed(()=>this.page()<=1);
  pageOneCoffeeStrengthForm: RadioButtonFormControl = new RadioButtonFormControl([
    { value: 'bold', label: 'Bold' },
    { value: 'medium', label: 'Medium' },
    { value: 'mild', label: 'Mild' },
  ]);
  pageTwoFlavoredCoffeeForm: RadioButtonFormControl = new RadioButtonFormControl([
    { value: 'y', label: 'Yes, I love flavor varieties.' },
    { value: 'n', label: 'No, I like to enjoy my coffee without additives' },
  ]);
  pageThreeCreamersForm: RadioButtonFormControl = new RadioButtonFormControl([
    { value: 'black', label: 'Black Coffee' },
    { value: 'milk', label: 'Coffee with Milk' },
    { value: 'sweet', label: 'Coffee with Sweeteners' },
    { value: 'sweetmilk', label: 'Coffee with Milk and Sweeteners' },
  ]);
  pageFourCoffeeTimeForm: RadioButtonFormControl = new RadioButtonFormControl([
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'night', label: 'Night' },
  ])
  pageFiveFlavorNotesForm: RadioButtonFormControl = new RadioButtonFormControl([
    { value: 'nutty', label: 'Nutty' },
    { value: 'fruity', label: 'Fruity' },
    { value: 'earthy', label: 'Earthy' },
    { value: 'floral', label: 'Floral' },
    { value: 'chocolate', label: 'Chocolate' },
  ])
  pageSixSingleOriginForm: RadioButtonFormControl = new RadioButtonFormControl([
    { value: 'so', label: 'Single Origin' },
    { value: 'bl', label: 'Blend' },
  ]);
  pageSevenCoffeeToolForm: RadioButtonFormControl = new RadioButtonFormControl([
    { value: 'espresso', label: 'Espresso' },
    { value: 'drip', label: 'Drip' },
    { value: 'french', label: 'French Press' },
    { value: 'pour', label: 'Pour Over' },
    { value: 'perc', label: 'Percolator' },
    { value: 'cold', label: 'Cold Brew' },
    { value: 'air', label: 'Airopress' },
  ])
  pageEightForm: RadioButtonFormControl = new RadioButtonFormControl([
    { value: 'fun', label: 'Fun' },
    { value: 'notfun', label: 'Not fun' },
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

    })
  }
}
