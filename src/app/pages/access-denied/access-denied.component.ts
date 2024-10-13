import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-access-denied-page',
  standalone: true,
  imports: [],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss'
})
export class AccessDeniedComponent {
  router = inject(Router);

  handleGoHome() {
    this.router.navigate(['/'])
  }
}
