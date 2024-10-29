import {Component} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";


@Component({
  selector: 'customer-landing-page',
  templateUrl: './customer-landing-page.component.html',
  styleUrl: './customer-landing-page.component.scss',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  host: {'class': 'flex-child'}
})
export class CustomerLandingPageComponent {

}
