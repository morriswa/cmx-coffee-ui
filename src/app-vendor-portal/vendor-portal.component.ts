import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition} from "@angular/cdk/overlay";
import {NgIf} from "@angular/common";
import {LoginService} from "../services/login.service";


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
  styleUrl: './vendor-portal.component.scss',
  host: {'class': 'flex-child'},
})
export class VendorPortalComponent implements OnInit {

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

}
