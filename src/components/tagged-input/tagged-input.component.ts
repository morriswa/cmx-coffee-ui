import {Component, Input} from "@angular/core";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: "tagged-input",
  templateUrl: "./tagged-input.component.html",
  styleUrl: "./tagged-input.component.scss",
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true,
})
export class TaggedInputComponent {
  @Input() label!: string;
  @Input() form!: FormControl<any>;
}
