import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {LoginService} from "../app/services/login.service";
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition} from "@angular/cdk/overlay";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-app-admin-portal',
  standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        CdkConnectedOverlay,
        CdkOverlayOrigin,
        NgIf
    ],
  templateUrl: './admin-portal.component.html',
  styleUrl: './admin-portal.component.scss',
  host: {'class': 'flex-child'},
})
export class AdminPortalComponent implements OnInit{

  // services
  login = inject(LoginService);


  // state
  accountMenuOpen: WritableSignal<boolean> = signal(false)
  accountName: WritableSignal<string|undefined> = signal(undefined);

  async ngOnInit() {
    this.accountName.set((await this.login.getUser()).name)
  }

  readonly accountMenuPosition: ConnectedPosition[] = [
    {
      offsetY: 35,
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];

  // logic
  handleLogout() {
    this.login.logout()
  }

}
