import {provideRouter, Routes} from "@angular/router";
import {EnvironmentProviders} from "@angular/core";
import {HasPermission} from "src/app/guards/permission.guard";

const routesConfig: Routes = [
  {
    path: "login",
    loadComponent: ()=>import('src/app/pages/login-page/login-page.component')
      .then(m=>m.LoginPageComponent)
  },
  {
    path: "vendor",
    canActivate: [HasPermission('cmx_coffee:vendor')],
    loadComponent: ()=>import('src/app/pages/vendor-portal/vendor-portal.component')
      .then(m=>m.VendorPortalComponent),
    children: [
      {
        path: "",
        pathMatch: "full",
        loadComponent: ()=>import('src/app/pages/vendor-portal/pages/vendor-landing-page/vendor-landing-page.component')
          .then(m=>m.VendorLandingPageComponent)
      },
      {
        path: "**",
        redirectTo: ""
      }
    ]
  },
  {
    path: "developer",
    canActivate: [HasPermission('cmx_coffee:admin')],
    loadComponent: ()=>import('src/app/pages/developer-portal/pages/developer-landing-page/developer-landing-page.component')
      .then(m=>m.DeveloperLandingPageComponent)
  },
  {
    path: "admin",
    canActivate: [HasPermission('cmx_coffee:admin')],
    loadComponent: ()=>import('src/app/pages/admin-portal/admin-portal.component')
      .then(m=>m.AdminPortalComponent),
    children: [
      {
        path: "",
        pathMatch: "full",
        loadComponent: ()=>import('src/app/pages/admin-portal/pages/admin-landing-page/admin-landing-page.component')
          .then(m=>m.AdminLandingPageComponent),
      },
      {
        path: "**",
        redirectTo: ""
      }
    ]
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
