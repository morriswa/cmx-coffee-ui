import {provideRouter, Routes} from "@angular/router";
import {EnvironmentProviders} from "@angular/core";
import {HasPermission} from "src/app/guards/permission.guard";
import {Auth0CallbackComponent} from "../components/auth0-callback/auth0-callback.component";

const routesConfig: Routes = [
  {
    path: "login",
    loadComponent: ()=>import('src/app/pages/login/login-page.component')
      .then(m=>m.LoginPageComponent)
  },
  {
    path: "forms/vendor-application",
    loadComponent: () => import('src/app/pages/vendor-application/vendor-application-page.component')
      .then(m=>m.VendorApplicationPageComponent)
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
        path: "sales",
        loadComponent: ()=>import('src/app/pages/admin-portal/pages/admin-sales-dashboard/admin-sales-dashboard.component')
          .then(m=>m.AdminSalesDashboardComponent),
      },
      {
        path: "vendors",
        loadComponent: ()=>import('src/app/pages/admin-portal/pages/vendor-management/vendor-management.component')
          .then(m=>m.VendorManagementComponent),
      },
      {
        path: "applicants",
        loadComponent: ()=>import('src/app/pages/admin-portal/pages/vendor-applicants/vendor-applicants.component')
          .then(m=>m.VendorApplicantsComponent),
      },
      {
        path: "**",
        redirectTo: "sales"
      }
    ]
  },
  {
    path: "forbidden",
    loadComponent: ()=>import('src/app/pages/access-denied/access-denied.component')
      .then(m=>m.AccessDeniedComponent),
  },
  {
    path: "logout",
    loadComponent: ()=>import('src/app/pages/logout/logout.component')
      .then(m=>m.LogoutComponent),
  },
  {
    path: "",
    pathMatch: "full",
    loadComponent: ()=>import('src/app/pages/landing/landing-page.component')
      .then(m=>m.LandingPageComponent),
  },
  {
    path: "callback",
    component: Auth0CallbackComponent
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
