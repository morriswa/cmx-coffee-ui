import {AppRouter} from "./routes.config";
import {AppHttpClient} from "./http-client.config";
import {ApplicationConfig} from "@angular/core";
import {AppAuthConfig} from "./auth0.config";
import {ApiClient} from "../services/api-client.service";
import {LoginService} from "../services/login.service";


export const AppConfig: ApplicationConfig = {
  providers: [
    // declare global services here
    ApiClient,
    LoginService,
    AppHttpClient,
    AppRouter,
    AppAuthConfig
  ]
};
