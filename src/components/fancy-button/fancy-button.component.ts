import {Component, Input} from "@angular/core";
import {NgClass} from "@angular/common";

@Component({
  selector: "fancy-button",
  template: `
    <div class="app-fancy-button-wrapper">
      <button [disabled]="disabled" [class]="'app-fancy-button ' +  color" [ngClass]="{'disabled': disabled}">
        <ng-content/>
      </button>
    </div>
  `,
  standalone: true,
  styleUrl: "./fancy-button.component.scss",
  imports: [
    NgClass
  ]
})
export class FancyButtonComponent {
  @Input() color: 'primary'|'neutral' = 'neutral';
  @Input() disabled: boolean = false;
}
