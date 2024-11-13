import {Component, computed, inject, OnInit, Signal, signal, WritableSignal} from "@angular/core";
import {ApiClient} from "../../../services/api-client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../../../types/product.type";
import {CurrencyPipe, NgIf} from "@angular/common";
import {LoaderComponent} from "../../../components/loader/loader.component";
import {CustomerPayment} from "../../../types/customer.type";
import {
  RadioButtonFormControl,
  RadioButtonGroupComponent, RadioButtonOptions
} from "../../../components/radio-button-group/radio-button-group.component";
import {FancyButtonComponent} from "../../../components/fancy-button/fancy-button.component";


@Component({
  selector: "app-checkout-page",
  templateUrl: "./checkout-page.component.html",
  styleUrl: "./checkout-page.component.scss",
  standalone: true,
  imports: [
    CurrencyPipe,
    LoaderComponent,
    RadioButtonGroupComponent,
    NgIf,
    FancyButtonComponent
  ],
  host: {class: 'flex-child'}
})
export class CheckoutPageComponent implements OnInit{


  // services
  api = inject(ApiClient);
  route = inject(ActivatedRoute);
  router = inject(Router);


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
  });
  payments: WritableSignal<CustomerPayment[]> = signal([]);


  // lifecycle
  paymentSelectionForm?: RadioButtonFormControl;

  async ngOnInit() {
    const order = await this.api.getOrderDetails(this.orderId);
    const payments = await this.api.getPaymentMethods() ?? [];

    this.orderDetails.set(order);
    this.payments.set(payments);

    const paymentOptions: RadioButtonOptions[] = payments.map(p=>{
      return {value: p.payment_id, label: p.nickname}
    });
    this.paymentSelectionForm = new RadioButtonFormControl(paymentOptions);
  }

  async handlePurchase() {
    if (this.paymentSelectionForm?.valid) {
      await this.api.completeOrder(this.orderId, this.paymentSelectionForm.value);
      await this.router.navigate(['/account', 'orders'])
    }
  }

  async handleDeleteOrder() {
   await this.api.deleteOrder(this.orderId);
   await this.router.navigate(['/'])
  }
}
