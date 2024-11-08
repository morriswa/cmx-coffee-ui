import {Component, inject} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {UserService} from "../../services/user.service";
import {LoaderComponent} from "../../../components/loader/loader.component";


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
  userSa = inject(UserService);
}
