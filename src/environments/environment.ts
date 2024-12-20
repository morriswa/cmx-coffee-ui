export const environment = {
  APP_API_ENDPOINT:'http://localhost:8000',
  RUNTIME:'local'
};

export const AUTH0_CONFIG = {
  domain: 'dev-9deub659.us.auth0.com',
  clientId: 'JDy3gRSPBVcmJmlXKsMBaMwwIV7if2c3',
  authorizationParams: {
    audience: 'api://localhost',
    scope: 'openid email profile cmx_coffee:admin',
    redirect_uri: window.location.origin + '/callback'
  },
  logoutUrl: window.location.origin + '/logout',
  // Specify configuration for the interceptor
  httpInterceptor: {
    allowedList: [
      { uri: `${environment.APP_API_ENDPOINT}/s/*` },
    ]
  },
  cacheLocation: "localstorage" as const
};
