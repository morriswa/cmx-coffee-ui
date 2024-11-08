import {Component, inject, signal, WritableSignal} from '@angular/core';
import {LoginService} from "src/services/login.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition} from "@angular/cdk/overlay";
import {UserService} from "./services/user.service";


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
export class CustomerPortalComponent {

  // const
  readonly accountMenuPosition: ConnectedPosition[] = [
    {
      offsetY: 35,
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];


  // services
  login = inject(LoginService);
  userSa = inject(UserService)


  // state
  accountMenuOpen: WritableSignal<boolean> = signal(false);


  handleLogin() {
    this.login.login();
  }

  handleLogout() {
    this.login.logout()
  }

}
