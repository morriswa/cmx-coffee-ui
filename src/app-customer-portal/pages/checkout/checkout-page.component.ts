import {Component, computed, inject, OnInit, Signal, signal, WritableSignal} from "@angular/core";
import {ApiClient} from "../../../services/api-client.service";
import {ActivatedRoute} from "@angular/router";
import {Order} from "../../../types/product.type";
import {CurrencyPipe} from "@angular/common";
import {LoaderComponent} from "../../../components/loader/loader.component";


@Component({
  selector: "app-checkout-page",
  templateUrl: "./checkout-page.component.html",
  styleUrl: "./checkout-page.component.scss",
  standalone: true,
  imports: [
    CurrencyPipe,
    LoaderComponent
  ],
  host: {class: 'flex-child'}
})
export class CheckoutPageComponent implements OnInit{


  // services
  api = inject(ApiClient);
  route = inject(ActivatedRoute);


  // state
  orderId = this.route.snapshot.params['order_id']
  orderDetails: WritableSignal<Order|undefined> = signal(undefined);
  items: Signal<number> = computed(()=>{
    const details = this.orderDetails();
    if (!details) return 0;
    let sum = 0;
    for (const item of details.items) {
      sum += item.quantity;
    }
    return sum;
  })


  // lifecycle
  async ngOnInit() {
    const order = await this.api.getOrderDetails(this.orderId);
    console.log(order);
    this.orderDetails.set(order);
  }
}
