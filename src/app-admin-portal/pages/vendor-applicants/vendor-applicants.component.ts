import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {AdminService} from "src/app-admin-portal/services/admin.service";
import {LoaderComponent} from "src/components/loader/loader.component";
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

  // services
  administration = inject(AdminService);
  dialogs = inject(Dialog);


  // state
  applicants: WritableSignal<any[]|undefined> = signal(undefined);


  // lifecycle
  async ngOnInit() {
    this.applicants.set(await this.administration.getApplicants())
  }


  // logic
  handleActionPopup(application: any, action: 'approve' | 'reject'): void {
    const ref = this.dialogs.open(VendorApplicantActionDialogComponent, {
      data: {
        'application': application,
        'action': action
      },
    });

    const ref$ = ref.closed.subscribe((result: any)=>{
      if (result?.action==='confirm') {
        if (action === 'approve') this.approveApplication(application);
        else if (action === 'reject') this.rejectApplication(application);
      } else {
        console.log(`no action on application ${application.application_id}`);
      }

      ref$.unsubscribe();
    });
  }

  approveApplication(application: any) {
    console.log(`implement me, approve application ${application.application_id}`);
  }

  rejectApplication(application: any) {
    console.log(`implement me, reject application ${application.application_id}`);
  }
}
