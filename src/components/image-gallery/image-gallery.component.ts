import {Component, Input, OnInit, signal, WritableSignal} from "@angular/core";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {until} from "src/utils";


@Component({
    selector: "image-gallery",
    templateUrl: "./image-gallery.component.html",
    styleUrl: "./image-gallery.component.scss",
    imports: [
        NgOptimizedImage,
        NgIf
    ]
})
export class ImageGalleryComponent implements OnInit {

  // component io
  @Input() set images(imgs: string[]) {
    this._images.set(imgs);
    this.selectedImage.set(imgs[0])
    this.selectedImageAlt.set(this.alt ?? (this.alts? this.alts[0] : 'not provided'));
  }

  /**
   * an array the same size as images containing alt tags in account-orders
   */
  @Input() public alts?: string[];

  /**
   * OVERRIDES alts, defines a string used as the alt tag for every photo in the gallery
   */
  @Input() public alt?: string;


  // component state
  _images: WritableSignal<string[]> = signal([])
  selectedImage: WritableSignal<any> = signal(undefined);
  selectedImageAlt: WritableSignal<string> = signal("");


  // lifecycle
  async ngOnInit() {
    if (!this._images() || !(this.alts||this.alt)) {
      throw new Error('images and alts||alt inputs are required')
    }

    if (this.alts) {
      if (this.images.length !== this.alts.length) {
        throw new Error('must supply same amount of images as alt tags')
      }
    }
  }


  // logic
  selectImage(image: string, alt: string) {
    this.selectedImage.set(image);
    this.selectedImageAlt.set(alt);
  }
}
