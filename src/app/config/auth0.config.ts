import {Provider} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthHttpInterceptor, provideAuth0} from "@auth0/auth0-angular";
import {AUTH0_CONFIG} from "../../environments/environment";

/**
 * provides application authentication config
 */
export const AppAuthConfig: Provider[] = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  provideAuth0(AUTH0_CONFIG)
]
