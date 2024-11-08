import {AppRouter} from "./routes.config";
import {ApplicationConfig} from "@angular/core";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {LoginService} from "../services/login.service";


export const TestConfig: ApplicationConfig = {
  providers: [
    // declare global services here
    AppRouter,
    {provide:LoginService, useValue: {}},
    provideHttpClientTesting(),
  ]
};
