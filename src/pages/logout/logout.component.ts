import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "src/services/login.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {until} from "src/utils";


@Component({
    selector: 'app-logout-page',
    imports: [
        NgIf
    ],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {


  // services
  router = inject(Router);
  login = inject(LoginService);


  // lifecycle
  async ngOnInit() {
    await until(this.login.ready)
    if (this.login.isAuthenticated) this.login.logout()
  }


  // logic
  async handleGoHome() {
    await this.router.navigate(['/'])
  }
}
