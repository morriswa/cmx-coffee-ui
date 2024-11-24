import {Component, inject, OnInit} from "@angular/core";
import {Dialog} from "@angular/cdk/dialog";
import {DeletePaymentDialogComponent} from "../../components/delete-payment-dialog/delete-payment-dialog.component";
import {
  CreateMockPaymentDialogComponent
} from "../../components/create-mock-payment-dialog/create-mock-payment-dialog.component";
import {ShoppingCartService} from "../../services/shopping-cart.service";


@Component({
  selector: "app-account-payments-page",
  templateUrl: "./account-payments-page.component.html",
  styleUrl: "./account-payments-page.component.scss",
  standalone: true
})
export class AccountPaymentsPageComponent implements OnInit {

  cart = inject(ShoppingCartService);
  dialogs = inject(Dialog);


  // lifecycle
  async ngOnInit() {
    await this.cart.refreshPaymentMethods();
  }

  handleDeletePaymentMethod(payment: any) {
    const ref = this.dialogs.open(DeletePaymentDialogComponent, { data: payment });

    const sub = ref.closed.subscribe(async (res: any)=>{
      if (res.result==='delete') {
        await this.cart.deletePaymentMethod(payment.payment_id)
      }

      sub.unsubscribe();
    })
  }

  handleCreatePaymentMethod() {
    const ref = this.dialogs.open(CreateMockPaymentDialogComponent)

    const sub = ref.closed.subscribe(async (res: any)=>{
      if (res.result==='create') {
        await this.cart.createPaymentMethod(res.nickname, res.territory)
      }

      sub.unsubscribe();
    })
  }

}
