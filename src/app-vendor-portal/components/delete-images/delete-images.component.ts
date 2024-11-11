import {Component, inject, signal, WritableSignal} from "@angular/core";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {NgOptimizedImage} from "@angular/common";


@Component({
  selector: "app-delete-images",
  templateUrl: "./delete-images.component.html",
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})
export class DeleteImagesComponent {
  data = inject(DIALOG_DATA);

  ref = inject(DialogRef);

  selectedImage: WritableSignal<{ url: string, id: string }|undefined> = signal(undefined);

  handleClose() {
    this.selectedImage.set(undefined);
    this.ref.close({result:'discard'})
  }

  handleCancel() {
    this.selectedImage.set(undefined);
  }

  handleDelete() {
    this.ref.close({result:'delete', imageId: this.selectedImage()?.id})
    this.selectedImage.set(undefined);
  }
}
