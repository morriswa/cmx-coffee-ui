import {EnvironmentProviders} from "@angular/core";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";

/**
 * provides an angular http client
 */
export const AppHttpClient: EnvironmentProviders
  = provideHttpClient(withInterceptorsFromDi());
