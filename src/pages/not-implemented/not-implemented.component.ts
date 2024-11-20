import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-not-implemented-page',
    imports: [],
    templateUrl: './not-implemented.component.html'
})
export class NotImplementedComponent {
  router = inject(Router);

  handleGoHome() {
    this.router.navigate(['/'])
  }
}
