import {AfterViewChecked, Component, Input} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";


@Component({
  selector: "image-gallery",
  templateUrl: "./image-gallery.component.html",
  styleUrl: "./image-gallery.component.scss",
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
})
export class ImageGalleryComponent implements AfterViewChecked {

  // component io
  @Input() public images!: string[];

  /**
   * an array the same size as images containing alt tags in order
   */
  @Input() public alts?: string[];

  /**
   * OVERRIDES alts, defines a string used as the alt tag for every photo in the gallery
   */
  @Input() public alt?: string;


  // lifecycle
  ngAfterViewChecked(): void {
    if (!this.images || !(this.alts||this.alt)) {
      throw new Error('images and alts||alt inputs are required')
    }

    if (this.alts) {
      if (this.images.length !== this.alts.length) {
        throw new Error('must supply same amount of images as alt tags')
      }
    }
  }
}
