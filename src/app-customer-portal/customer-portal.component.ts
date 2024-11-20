import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {LoginService} from "src/services/login.service";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition} from "@angular/cdk/overlay";


@Component({
    selector: 'app-customer-portal',
    imports: [
        NgIf,
        RouterLink,
        RouterOutlet,
        CdkConnectedOverlay,
        CdkOverlayOrigin,
        NgOptimizedImage
    ],
    templateUrl: './customer-portal.component.html',
    styleUrl: './customer-portal.component.scss',
    host: { 'class': 'flex-child' }
})
export class CustomerPortalComponent implements OnInit {

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


  // state
  accountMenuOpen: WritableSignal<boolean> = signal(false);


  ngOnInit() {
    this.login.refreshUserCache();
  }

  handleLogin() {
    this.login.login();
  }
}
