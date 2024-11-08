import {Component, inject} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {LoaderComponent} from "src/components/loader/loader.component";
import {LoginService} from "src/services/login.service";


@Component({
  selector: 'customer-account-page',
  templateUrl: './account-page.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterOutlet,
    LoaderComponent,
    RouterLink
  ]
})
export class AccountPageComponent {

  // services
  userSa = inject(LoginService);
}
