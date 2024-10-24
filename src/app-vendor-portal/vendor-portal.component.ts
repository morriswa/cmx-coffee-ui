import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition} from "@angular/cdk/overlay";
import {NgIf} from "@angular/common";
import {LoginService} from "../services/login.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-app-vendor-portal',
  standalone: true,
    imports: [
        RouterOutlet,
        CdkConnectedOverlay,
        CdkOverlayOrigin,
        NgIf,
        RouterLink
    ],
  templateUrl: './vendor-portal.component.html',
  styleUrl: './vendor-portal.component.scss'
})
export class VendorPortalComponent implements OnInit, OnDestroy {

  // services
  login = inject(LoginService);


  // state
  isLoggedIn: WritableSignal<boolean> = signal(false);
  accountMenuOpen: WritableSignal<boolean> = signal(false);
  accountName: WritableSignal<string|undefined> = signal(undefined);

  private _authenticatedSubscription?: Subscription;
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
