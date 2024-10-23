import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"; // HttpClient and HttpHeaders for HTTP requests
import { firstValueFrom } from "rxjs"; // Used to convert observables to promises
import { environment } from "src/environments/environment"; // Import environment variables


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
  public health(): Promise<any> {
    return this.request<any>("GET", 'health');
  }

  public secure_health(): Promise<any> {
    return this.request<any>("GET", 's/health');
  }

  public admin_health(): Promise<any> {
    return this.request<any>("GET", 'a/health');
  }

  public permissions(): Promise<any> {
    return this.request<any>("GET", 'permissions');
  }

  public profile() {
    return this.request<any>("GET", 'profile');
  }

  applyForVendorship(vendor_application: any) {
    return this.request('POST', 's/forms/vendor-application', vendor_application);
  }
}
