import {Component, input} from "@angular/core";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
    selector: "tagged-input",
    templateUrl: "./tagged-input.component.html",
    styleUrl: "./tagged-input.component.scss",
    imports: [
        FormsModule,
        ReactiveFormsModule
    ]
})
export class TaggedInputComponent {
  readonly label = input.required<string>();
  readonly form = input.required<FormControl<any>>();
}
