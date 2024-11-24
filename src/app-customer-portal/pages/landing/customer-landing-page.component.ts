import {Component} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {FancyButtonComponent} from "src/components/fancy-button/fancy-button.component";
import {RouterLink} from "@angular/router";


@Component({
    selector: 'customer-landing-page',
    templateUrl: './customer-landing-page.component.html',
    styleUrl: './customer-landing-page.component.scss',
    imports: [
        NgOptimizedImage,
        FancyButtonComponent,
        RouterLink
    ],
    host: { 'class': 'flex-child' }
})
export class CustomerLandingPageComponent {

}
