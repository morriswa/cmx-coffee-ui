import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin-portal',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './admin-portal.component.html',
  styleUrl: './admin-portal.component.scss'
})
export class AdminPortalComponent {

}
