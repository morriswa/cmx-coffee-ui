import {Component, Input} from "@angular/core";
import {Product} from 'src/types/product.type';
import {CurrencyPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: "app-product-tile",
  templateUrl: "./product-tile.component.html",
  styleUrl: "product-tile.component.scss",
  imports: [
    CurrencyPipe,
    NgIf,
    RouterLink,
    NgOptimizedImage
  ],
  standalone: true
})
export class ProductTileComponent {
  @Input() product!: Product;
}
