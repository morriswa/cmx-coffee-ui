import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {LoginService} from "../app/services/login.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {RouterLink, RouterOutlet} from "@angular/router";
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition} from "@angular/cdk/overlay";


@Component({
  selector: 'app-customer-portal',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink,
    RouterOutlet,
    CdkConnectedOverlay,
    CdkOverlayOrigin
  ],
  templateUrl: './customer-portal.component.html',
  styleUrl: './customer-portal.component.scss',
  host: {'class': 'flex-child'}
})
export class CustomerPortalComponent implements OnInit, OnDestroy {

  login = inject(LoginService);
  isLoggedIn: WritableSignal<boolean> = signal(false);
  private _authenticatedSubscription?: Subscription;
  accountMenuOpen: WritableSignal<boolean> = signal(false);
  accountName: WritableSignal<string|undefined> = signal(undefined);

  readonly accountMenuPosition: ConnectedPosition[] = [
    {
      offsetY: 35,
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];

  async ngOnInit() {
    this._authenticatedSubscription = this.login.isAuthenticated$.subscribe(
      (res)=>this.isLoggedIn.set(res)
    );
    const user = await this.login.getUser()
    this.accountName.set(user.name)
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
