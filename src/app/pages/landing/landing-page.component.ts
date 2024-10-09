import {Component, inject} from '@angular/core';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  login = inject(LoginService);

  handleLogin() {
    this.login.login();
  }

  handleLogout() {
    this.login.logout()
  }
}
