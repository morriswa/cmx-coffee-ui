import {provideRouter, Routes} from "@angular/router";
import {EnvironmentProviders} from "@angular/core";

const routesConfig: Routes = [
  {
    path: "login",
    loadComponent: ()=>import('src/app/pages/login-page/login-page.component')
      .then(m=>m.LoginPageComponent)
  },
  {
    path: "",
    pathMatch: "full",
    loadComponent: ()=>import('src/app/pages/landing-page/landing-page.component')
      .then(m=>m.LandingPageComponent),
  },
  {
    path: "**",
    redirectTo: ""
  }
]

/**
 * provides application routing
 */
export const AppRouter: EnvironmentProviders
  = provideRouter(routesConfig);
