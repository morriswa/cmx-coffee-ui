import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";


@Component({
  selector: "app-account-advanced-actions-page",
  templateUrl: "./account-advanced-actions-page.component.html",
  standalone: true,
  imports: [
    RouterLink
  ],
  host: {class: 'flex-child'}
})
export class AccountAdvancedActionsPageComponent {

}
