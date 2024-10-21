export const environment = {
  APP_API_ENDPOINT:'https://www.morriswa.org/cmx/api/coffee',
  RUNTIME:'prod'
};

export const AUTH0_CONFIG = {
  domain: 'dev-9deub659.us.auth0.com',
  clientId: 'JDy3gRSPBVcmJmlXKsMBaMwwIV7if2c3',
  authorizationParams: {
    audience: 'api://localhost',
    scope: 'openid email cmx_coffee:admin',
    redirect_uri: window.location.origin + '/cmx/coffee/callback'
  },
  logoutUrl: window.location.origin + '/logout',
  // Specify configuration for the interceptor
  httpInterceptor: {
    allowedList: [
      { uri: `${environment.APP_API_ENDPOINT}/*` },
    ]
  },
  cacheLocation: "localstorage" as const
};
