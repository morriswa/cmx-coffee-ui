import {inject, Injectable} from "@angular/core";
import {ApiClient} from "../../services/api-client.service";

@Injectable()
export class VendorService {
  api = inject(ApiClient);

  async getProducts() {
    return this.api.getProductsForVendor();
  }

  async getProductDetails(productId: number) {
    return this.api.getProductDetailsForVendor(productId);
  }

  async getProductImages(productId: number) {
    return this.api.getProductImages(productId);
  }

  listProduct(createRequest: any) {
    return this.api.listProduct(createRequest);
  }

  addProductImage(productId: number, newImage: File) {
    return this.api.uploadProductImage(productId, newImage);
  }

  unlistProduct(product_id: number) {
    return this.api.unlistProduct(product_id)
  }
}
