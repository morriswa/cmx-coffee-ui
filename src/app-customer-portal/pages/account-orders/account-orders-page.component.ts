import {Component, inject, OnInit} from "@angular/core";
import {ApiClient} from "src/services/api-client.service";


@Component({
  selector: "app-account-orders-page",
  templateUrl: "./account-orders-page.component.html",
  standalone: true
})
export class AccountOrdersPageComponent implements OnInit {
  api = inject(ApiClient);

  async ngOnInit() {
    const orders = await this.api.getCustomerOrders()
    console.log(orders)
  }

}
