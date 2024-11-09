import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {ApiClient} from "src/services/api-client.service";


@Component({
  selector: "app-payments-page",
  templateUrl: "./payments-page.component.html",
  styleUrl: "./payments-page.component.scss",
  standalone: true
})
export class PaymentsPageComponent implements OnInit {

  api = inject(ApiClient);


  // state
  paymentMethods: WritableSignal<any[]|undefined> = signal(undefined)


  // lifecycle
  async ngOnInit() {
    const pays = await this.api.getPaymentMethods();
    this.paymentMethods.set(pays);
  }
}
