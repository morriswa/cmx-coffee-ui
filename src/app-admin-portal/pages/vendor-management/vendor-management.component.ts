import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-vendor-management',
    imports: [
        DatePipe
    ],
    templateUrl: './vendor-management.component.html',
    styleUrl: './vendor-management.component.scss'
})
export class VendorManagementComponent implements OnInit{


  // services
  administration = inject(AdminService);


  // state
  vendors: WritableSignal<any[]|undefined> = signal(undefined);

  // lifecycle
  async ngOnInit() {
    const vendors = await this.administration.getVendorsForAdmin();
    this.vendors.set(vendors);
  }

}
