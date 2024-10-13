import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-logout-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
  router = inject(Router);
  login = inject(LoginService);
  loginStatus = this.login.isAuthenticated();

  async ngOnInit() {
    if (await this.loginStatus) {
      this.login.logout()
    }
  }

  async handleGoHome() {
    await this.router.navigate(['/'])
  }
}
