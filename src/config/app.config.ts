import {AppRoutes} from "./routes.config";
import {ApplicationConfig} from "@angular/core";
import {ApiClient} from "src/services/api-client.service";
import {LoginService} from "src/services/login.service";
import { authHttpInterceptorFn, provideAuth0 } from "@auth0/auth0-angular";
import { AUTH0_CONFIG } from "src/environments/environment";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter } from "@angular/router";


export const AppConfig: ApplicationConfig = {
  providers: [
    // declare global services here
    ApiClient,
    LoginService,
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideRouter(AppRoutes),
    provideAuth0(AUTH0_CONFIG)
  ]
};
