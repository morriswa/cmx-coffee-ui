import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {LoginService} from "../app/services/login.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-customer-portal',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './customer-portal.component.html',
  styleUrl: './customer-portal.component.scss',
  host: {'class': 'flex-child'}
})
export class CustomerPortalComponent implements OnInit, OnDestroy {

  login = inject(LoginService);
  isLoggedIn: WritableSignal<boolean> = signal(false);
  private _authenticatedSubscription?: Subscription;

  ngOnInit(): void {
    this._authenticatedSubscription = this.login.isAuthenticated$.subscribe(
      (res)=>this.isLoggedIn.set(res)
    );
  }

  ngOnDestroy(): void {
    this._authenticatedSubscription?.unsubscribe();
  }

  handleLogin() {
    this.login.login();
  }

  handleLogout() {
    this.login.logout()
  }


}
