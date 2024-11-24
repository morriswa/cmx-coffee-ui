import {Component, input} from "@angular/core";
import {NgClass} from "@angular/common";

@Component({
    selector: "fancy-button",
    template: `
    <div class="app-fancy-button-wrapper">
      <button [disabled]="disabled()" [class]="'app-fancy-button ' +  color()" [ngClass]="{'disabled': disabled()}">
        <ng-content/>
      </button>
    </div>
  `,
    styleUrl: "./fancy-button.component.scss",
    imports: [
        NgClass
    ]
})
export class FancyButtonComponent {
  readonly color = input<'primary' | 'neutral'>('neutral');
  readonly disabled = input<boolean>(false);
}
