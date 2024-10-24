import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {LoaderComponent} from "../../../components/loader/loader.component";
import {Dialog} from "@angular/cdk/dialog";
import {
  VendorApplicantActionDialogComponent
} from "./vendor-applicant-action-dialog/vendor-applicant-action-dialog.component";

@Component({
  selector: 'app-vendor-applicants',
  standalone: true,
  imports: [
    LoaderComponent
  ],
  templateUrl: './vendor-applicants.component.html',
  styleUrl: './vendor-applicants.component.scss'
})
export class VendorApplicantsComponent implements OnInit{

  administration = inject(AdminService);
  dialogs = inject(Dialog);

  applicants: WritableSignal<any[]|undefined> = signal(undefined);

  async ngOnInit() {
    this.applicants.set(await this.administration.getApplicants())
  }

  handleApprovePopup(application: any) {
    const ref = this.dialogs.open(VendorApplicantActionDialogComponent, {
      data: application,
      disableClose: true
    });

    const ref$ = ref.closed.subscribe((result: any)=>{
      console.log('implement me!!');
      if (result.action==='approve') {
        console.log(`approving application ${application.application_id}`);
      } else {
        console.log(`no action on application ${application.application_id}`);
      }

      ref$.unsubscribe();
    });
  }

}
