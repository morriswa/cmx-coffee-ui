import {Component, computed, effect, inject, OnInit, Signal, signal, WritableSignal} from "@angular/core";
import {ApiClient} from "../../../services/api-client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../../../types/product.type";
import {CurrencyPipe, NgIf} from "@angular/common";
import {LoaderComponent} from "../../../components/loader/loader.component";
import {
  RadioButtonFormControl,
  RadioButtonGroupComponent, RadioButtonOptions
} from "../../../components/radio-button-group/radio-button-group.component";
import {FancyButtonComponent} from "../../../components/fancy-button/fancy-button.component";
import {
  CreateMockPaymentDialogComponent
} from "../../components/create-mock-payment-dialog/create-mock-payment-dialog.component";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {Dialog} from "@angular/cdk/dialog";


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
  cart = inject(ShoppingCartService);
  dialogs = inject(Dialog);


  // state
  orderId = this.route.snapshot.params['order_id']
  paymentSelectionForm?: RadioButtonFormControl;


  // get
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


  // lifecycle
  constructor() {
    effect(()=>{
      const payments = this.cart.paymentMethods();

      const paymentOptions: RadioButtonOptions[] = payments.map(p=>{
        return {value: p.payment_id, label: p.nickname}
      });
      this.paymentSelectionForm = new RadioButtonFormControl(paymentOptions);
    })
  }

  async ngOnInit() {
    this.cart.refreshPaymentMethods();
    const order = await this.api.getOrderDetails(this.orderId);
    this.orderDetails.set(order);
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

  handleCreatePaymentMethod() {
    const ref = this.dialogs.open(CreateMockPaymentDialogComponent)

    const sub = ref.closed.subscribe(async (res: any)=>{
      if (res.result==='create') {
        await this.cart.createPaymentMethod(res.nickname, res.territory);
      }

      sub.unsubscribe();
    })
  }
}
