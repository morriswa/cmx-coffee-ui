import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {AdminService} from "src/app-admin-portal/services/admin.service";
import {LoaderComponent} from "src/components/loader/loader.component";
import {Dialog} from "@angular/cdk/dialog";
import {
  VendorApplicantActionDialogComponent
} from "../../components/vendor-applicant-action-dialog/vendor-applicant-action-dialog.component";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-vendor-applicants',
  standalone: true,
  imports: [
    LoaderComponent,
    NgIf
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

    const ref$ = ref.closed.subscribe(async (result: any)=>{
      if (result?.action==='confirm') {
        if (action === 'approve') await this.approveApplication(application.application_id);
        else if (action === 'reject') await this.rejectApplication(application.application_id);
      } else {
        console.log(`no action on application ${application.application_id}`);
      }

      ref$.unsubscribe();
    });
  }

  async approveApplication(application_id: number) {
    await this.administration.processApplicant(application_id, 'approve')
    this.applicants.update(apps=>apps?.filter(app=>app.application_id!==application_id))
  }

  async rejectApplication(application_id: number) {
    await this.administration.processApplicant(application_id, 'reject')
    this.applicants.update(apps=>apps?.filter(app=>app.application_id!==application_id))
  }
}
