import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"; // HttpClient and HttpHeaders for HTTP requests
import { firstValueFrom } from "rxjs"; // Used to convert observables to promises
import { environment } from "src/environments/environment";
import {Product} from "src/types/product.type"; // Import environment variables


// Define the supported HTTP methods
export type SUPPORTED_METHODS = 'GET' | 'POST' | 'PUT' | 'DELETE';


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
    return this.request<any>("GET", 'permissions');
  }

  profile() {
    return this.request<any>("GET", 'profile');
  }

  applyForVendorship(vendor_application: any) {
    return this.request('POST', 's/forms/vendor-application', vendor_application);
  }

  getApplicants() {
    return this.request<any[]>('GET', 'a/vendor-applications')
  }

  processApplicant(application_id: number, action: "approve" | "reject"): Promise<void> {
    return this.request('PUT', `a/vendor-application/${application_id}?action=${action}`)
  }

  getProductsForVendor() {
    return this.request<any[]>('GET', 's/vendor/products');
  }

  getProductDetailsForVendor(productId: number) {
    return this.request('GET', `s/vendor/product/${productId}`);
  }

  getProductImages(productId: number) {
    return this.request<string[]>('GET', `s/product/${productId}/image`);
  }

  getProductsForCustomer() {
    return this.request<Product[]>('GET', `s/shop/products`);
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
}
