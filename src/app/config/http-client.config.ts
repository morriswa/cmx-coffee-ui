import {EnvironmentProviders} from "@angular/core";
import {provideHttpClient} from "@angular/common/http";

/**
 * provides an angular http client
 */
export const AppHttpClient: EnvironmentProviders
  = provideHttpClient();
