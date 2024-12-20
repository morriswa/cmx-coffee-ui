import {inject, Injectable} from "@angular/core";
import {ApiClient} from "../../services/api-client.service";

@Injectable()
export class AdminService {

  api = inject(ApiClient);


  async getApplicants() {
    return this.api.getApplicants()
  }

  async sendNewsletterEmails(){
    return this.api.sendNewsletterEmails()
  }

  async processApplicant(application_id: number, action: 'approve' | 'reject') {
    return this.api.processApplicant(application_id, action);
  }

  async getVendorsForAdmin() {
    return this.api.getVendorsForAdmin()
  }
}
