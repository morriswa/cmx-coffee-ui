import {inject, Injectable} from "@angular/core";
import {ApiClient} from "../../services/api-client.service";

@Injectable()
export class AdminService {

  api = inject(ApiClient);


  async getApplicants() {
    return this.api.getApplicants()
  }
}
