import {Component, EventEmitter, Output, signal, WritableSignal} from "@angular/core";
import {FormControl, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: "file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrl: "./file-upload.component.scss",
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})
export class FileUploadComponent {

  // state
  fileForm: FormControl = new FormControl();
  stagedFile: WritableSignal<File|undefined> = signal(undefined)
  @Output() onConfirm = new EventEmitter<File>();

  // logic
  confirm() {
    const file = this.stagedFile();
    if (file) {
      this.onConfirm.emit(file);
      this.fileForm.reset()
    }
  }

  stageFile($event: any) {
    this.stagedFile.set($event.target.files[0])
  }
}