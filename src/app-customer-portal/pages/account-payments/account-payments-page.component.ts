import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {ApiClient} from "src/services/api-client.service";
import {Dialog} from "@angular/cdk/dialog";
import {DeletePaymentDialogComponent} from "../../components/delete-payment-dialog/delete-payment-dialog.component";
import {
  CreateMockPaymentDialogComponent
} from "../../components/create-mock-payment-dialog/create-mock-payment-dialog.component";


@Component({
  selector: "app-account-payments-page",
  templateUrl: "./account-payments-page.component.html",
  styleUrl: "./account-payments-page.component.scss",
  standalone: true
})
export class AccountPaymentsPageComponent implements OnInit {

  api = inject(ApiClient);
  dialogs = inject(Dialog);


  // state
  paymentMethods: WritableSignal<any[]|undefined> = signal(undefined)


  // lifecycle
  async ngOnInit() {
    const pays = await this.api.getPaymentMethods();
    this.paymentMethods.set(pays);
  }

  handleDeletePaymentMethod(payment: any) {
    const ref = this.dialogs.open(DeletePaymentDialogComponent, { data: payment });

    const sub = ref.closed.subscribe(async (res: any)=>{
      if (res.result==='delete') {
        await this.deletePaymentMethod(payment.payment_id)
      }

      sub.unsubscribe();
    })
  }

  handleCreatePaymentMethod() {
    const ref = this.dialogs.open(CreateMockPaymentDialogComponent)

    const sub = ref.closed.subscribe(async (res: any)=>{
      if (res.result==='create') {
        await this.createPaymentMethod(res.nickname, res.territory)
      }

      sub.unsubscribe();
    })
  }

  private async deletePaymentMethod(payment_id: string) {
    await this.api.deletePaymentMethod(payment_id);
    this.paymentMethods.update(m=>m?.filter(p=>p.payment_id!==payment_id))
  }

  private async createPaymentMethod(nickname: string, territory: string) {
    await this.api.createPaymentMethod(nickname, territory);
    this.paymentMethods.set(await this.api.getPaymentMethods());
  }


}
