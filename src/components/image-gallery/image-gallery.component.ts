import {Component, Input, OnInit, signal, WritableSignal, input} from "@angular/core";
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
    const alts = this.alts();
    this.selectedImageAlt.set(this.alt() ?? (alts? alts[0] : 'not provided'));
  }

  /**
   * an array the same size as images containing alt tags in account-orders
   */
  public readonly alts = input<string[]>();

  /**
   * OVERRIDES alts, defines a string used as the alt tag for every photo in the gallery
   */
  public readonly alt = input<string>();


  // component state
  _images: WritableSignal<string[]> = signal([])
  selectedImage: WritableSignal<any> = signal(undefined);
  selectedImageAlt: WritableSignal<string> = signal("");


  // lifecycle
  async ngOnInit() {
    const alts = this.alts();
    if (!this._images() || !(alts||this.alt())) {
      throw new Error('images and alts||alt inputs are required')
    }

    if (alts) {
      if (this.images.length !== alts.length) {
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
