import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-app-vendor-portal',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './vendor-portal.component.html',
  styleUrl: './vendor-portal.component.scss'
})
export class VendorPortalComponent {

}
