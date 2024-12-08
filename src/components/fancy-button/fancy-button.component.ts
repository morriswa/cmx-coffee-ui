import {Component, Input} from "@angular/core";

@Component({
  selector: "fancy-button",
  template: `
    <div class="app-fancy-button-wrapper">
      <button [class]="'app-fancy-button ' +  color">
        <ng-content/>
      </button>
    </div>
  `,
  standalone: true,
  styleUrl: "./fancy-button.component.scss",
})
export class FancyButtonComponent {
  @Input() color: 'primary'|'neutral' = 'neutral';
}
