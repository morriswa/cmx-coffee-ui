import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"; // HttpClient and HttpHeaders for HTTP requests
import { firstValueFrom } from "rxjs"; // Used to convert observables to promises
import { environment } from "src/environments/environment";
import {CartItem, Product} from "src/types/product.type";
import {CustomerProductPreferences} from "src/types/customer.type";
import {VendorProduct} from "src/types/vendor.type"; // Import environment variables


// Define the supported HTTP methods
export type SUPPORTED_METHODS = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';


@Injectable()
export class ApiClient {

  // The base API endpoint (from environment variables)
  private endpoint = environment.APP_API_ENDPOINT;

  // Inject the HttpClient service to make HTTP requests
  private http = inject(HttpClient);


  /**
   * Private helper method to send HTTP requests.
   * @param method The HTTP method (GET, POST, PUT, DELETE)
   * @param path The API endpoint to hit
   * @param body Optional request body (for POST/PUT requests)
   * @param additionalHeaders Optional additional HTTP headers
   * @returns A promise that resolves with the response body or undefined
   */
  private request<T>(method: SUPPORTED_METHODS, path: string, body?: any, additionalHeaders?: HttpHeaders): Promise<T | undefined> {
    return firstValueFrom(this.http.request<T>(
      method, // The HTTP method
      `${this.endpoint}/${path}`, // The API endpoint
      {
        observe: 'body', // Observe the response body
        headers: additionalHeaders, // Any additional headers to send
        body: body // The body of the request (for POST/PUT)
      }
    ));
  }


  // publics
  health(): Promise<any> {
    return this.request<any>("GET", 'health');
  }

  permissions(): Promise<any> {
    return this.request<any>("GET", 's/permissions');
  }

  profile() {
    return this.request<any>("GET", 'profile');
  }

  applyForVendorship(vendor_application: any) {
    return this.request('POST', 's/forms/vendor-application', vendor_application);
  }

  getApplicants() {
    return this.request<any[]>('GET', 's/admin/vendor-applications')
  }

  processApplicant(application_id: number, action: "approve" | "reject"): Promise<void> {
    return this.request('PUT', `s/admin/vendor-application/${application_id}?action=${action}`)
  }

  getProductsForVendor() {
    return this.request<any[]>('GET', 's/vendor/products');
  }

  getProductDetailsForVendor(productId: number) {
    return this.request<VendorProduct>('GET', `s/vendor/product/${productId}`);
  }

  getProductImages(productId: number) {
    return this.request<string[]>('GET', `product/${productId}/image`);
  }

  getProductDetailsForCustomer(productId: number) {
    return this.request('GET', `product/${productId}`)
  }

  getProductsForCustomer() {
    return this.request<Product[]>('GET', `products`);
  }

  listProduct(createRequest: any) {
    return this.request('POST', 's/vendor/products', createRequest);
  }

  uploadProductImage(productId: number, image: File) {
    let postBody = new FormData();
    postBody.append("image_upload",image);

    return this.request('POST', `s/vendor/product/${productId}/image`, postBody);
  }

  unlistProduct(product_id: number) {
    return this.request('DELETE', `s/vendor/product/${product_id}`);
  }

  updateCustomerPreferences(request: CustomerProductPreferences) {
    return this.request('PATCH', `s/profile/product-preferences`, request);
  }

  getCustomerPreferences() {
    return this.request('GET', `s/profile/product-preferences`);
  }

  updateProduct(productId: number, changes: VendorProduct) {
    return this.request('PATCH', `s/vendor/product/${productId}`, changes)
  }

  getVendorsForAdmin() {
    return this.request<any[]>('GET', 's/admin/vendors')
  }

  getPaymentMethods() {
    return this.request<any[]>('GET', 's/payment');
  }

  deletePaymentMethod(payment_id: string) {
    return this.request('DELETE', 's/payment', {'payment_id': payment_id})
  }

  createPaymentMethod(nickname: string) {
    return this.request('POST', 's/payment', {'nickname': nickname});
  }

  getShoppingCart() {
    return this.request<CartItem[]>('GET', 's/cart');
  }

  async getProductReviewState(productId: any) {
    return this.request<any>('GET', `product/${productId}/review-stats`);
  }
}
