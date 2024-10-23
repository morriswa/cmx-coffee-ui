import {provideRouter, Routes} from "@angular/router";
import {EnvironmentProviders} from "@angular/core";
import {HasPermission} from "src/app/guards/permission.guard";
import {Auth0CallbackComponent} from "../app/components/auth0-callback/auth0-callback.component";
import {AccessDeniedComponent} from "../app/pages/access-denied/access-denied.component";
import {AdminService} from "../app-admin-portal/services/admin.service";
import {NotImplementedComponent} from "../app/pages/not-implemented/not-implemented.component";
import {LogoutComponent} from "../app/pages/logout/logout.component";


const routesConfig: Routes = [
  // declare portal routes
  {
    title: "Product Name",
    path: "",
    loadComponent: ()=>import('src/app-customer-portal/customer-portal.component')
      .then(m=>m.CustomerPortalComponent),
    children: [
      {
        path: "",
        pathMatch: "full",
        loadComponent: () => import('src/app-customer-portal/pages/landing/customer-landing-page.component')
          .then(m=>m.CustomerLandingPageComponent)
      },
      {
        path: "shop",
        loadComponent: () => import('src/app-customer-portal/pages/shop/shop-page.component')
          .then(m=>m.ShopPageComponent)
      },
      {
        path: "profile",
        loadComponent: () => import('src/app-customer-portal/pages/customer-profile/customer-profile-page.component')
          .then(m=>m.CustomerProfilePageComponent)
      },
      {
        path: "forms/vendor-application",
        canActivate: [HasPermission('cmx_coffee:appuser')],
        loadComponent: () => import('src/app/pages/vendor-application/vendor-application-page.component')
          .then(m=>m.VendorApplicationPageComponent)
      },
    ]
  },
  {
    title: "Vendor Settings",
    path: "vendor",
    canActivate: [HasPermission('cmx_coffee:vendor')],
    loadComponent: ()=>import('src/app-vendor-portal/vendor-portal.component')
      .then(m=>m.VendorPortalComponent),
    children: [
      {
        path: "",
        pathMatch: "full",
        loadComponent: ()=>import('src/app-vendor-portal/pages/vendor-landing-page/vendor-landing-page.component')
          .then(m=>m.VendorLandingPageComponent)
      },
      {
        path: "**",
        redirectTo: ""
      }
    ]
  },
  {
    title: "CMX Developer",
    path: "developer",
    canActivate: [HasPermission('cmx_coffee:admin')],
    loadComponent: ()=>import('src/app-developer-portal/pages/developer-landing-page/developer-landing-page.component')
      .then(m=>m.DeveloperLandingPageComponent)
  },
  {
    title: "Admin",
    path: "admin",
    canActivate: [HasPermission('cmx_coffee:admin')],
    providers: [AdminService],
    loadComponent: ()=>import('src/app-admin-portal/admin-portal.component')
      .then(m=>m.AdminPortalComponent),
    children: [
      {
        path: "sales",
        loadComponent: ()=>import('src/app-admin-portal/pages/admin-sales-dashboard/admin-sales-dashboard.component')
          .then(m=>m.AdminSalesDashboardComponent),
      },
      {
        path: "vendors",
        loadComponent: ()=>import('src/app-admin-portal/pages/vendor-management/vendor-management.component')
          .then(m=>m.VendorManagementComponent),
      },
      {
        path: "applicants",
        loadComponent: ()=>import('src/app-admin-portal/pages/vendor-applicants/vendor-applicants.component')
          .then(m=>m.VendorApplicantsComponent),
      },
      {
        path: "**",
        redirectTo: "sales"
      }
    ]
  },
  // declare core application routes
  {
    path: "logout",
    component: LogoutComponent
  },
  {
    path: "callback",
    component: Auth0CallbackComponent
  },
  {
    path: "forbidden",
    component: AccessDeniedComponent,
  },
  {
    path: "not-implemented",
    component: NotImplementedComponent,
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
