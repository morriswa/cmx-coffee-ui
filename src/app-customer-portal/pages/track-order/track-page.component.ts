import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'track-page',
  templateUrl: './track-page.component.html',
  styleUrl: './track-page.component.scss',
  standalone: true,
  imports: [
    RouterLink
  ],
  host: {'class': 'flex-child'}
})
export class TrackPageComponent {

}
