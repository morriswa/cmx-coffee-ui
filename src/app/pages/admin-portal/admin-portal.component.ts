import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-admin-portal',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './admin-portal.component.html',
  styleUrl: './admin-portal.component.scss'
})
export class AdminPortalComponent {

  // services
  login = inject(LoginService);


  // logic
  handleLogout() {
    this.login.logout()
  }
}
