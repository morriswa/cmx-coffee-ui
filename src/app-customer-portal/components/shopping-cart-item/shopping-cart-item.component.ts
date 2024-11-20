import {Component, EventEmitter, OnInit, Output, input} from "@angular/core";
import {NumberFormControl, NumberStepperComponent} from "../../../components/number-stepper/number-stepper.component";
import {CartItem} from "../../../types/product.type";
import {CurrencyPipe} from "@angular/common";


@Component({
    selector: "app-shopping-cart-item",
    templateUrl: "./shopping-cart-item.component.html",
    styleUrl: "shopping-cart-item.component.scss",
    imports: [
        NumberStepperComponent,
        CurrencyPipe
    ]
})
export class ShoppingCartItemComponent implements OnInit {
  quantityForm: NumberFormControl = new NumberFormControl(0, 99);
  readonly item = input.required<CartItem>();
  @Output() quantityChanged = new EventEmitter<number>();

  ngOnInit() {
    this.quantityForm.value = this.item().quantity;
  }

  handleQuantityUpdated() {
    this.quantityChanged.emit(this.quantityForm.value);
  }
}
