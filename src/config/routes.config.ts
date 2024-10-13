import {provideRouter, Routes} from "@angular/router";
import {EnvironmentProviders} from "@angular/core";
import {HasPermission} from "src/app/guards/permission.guard";
import {Auth0CallbackComponent} from "../app/components/auth0-callback/auth0-callback.component";
import {AccessDeniedComponent} from "../app/pages/access-denied/access-denied.component";
import {AdminService} from "../app-admin-portal/services/admin.service";


const routesConfig: Routes = [
  // declare portal routes
  {
    title: "customer-portal",
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
      }
    ]
  },
  {
    title: "vendor-portal",
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
    title: "developer-portal",
    path: "developer",
    canActivate: [HasPermission('cmx_coffee:admin')],
    loadComponent: ()=>import('src/app-developer-portal/pages/developer-landing-page/developer-landing-page.component')
      .then(m=>m.DeveloperLandingPageComponent)
  },
  {
    title: "admin-portal",
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
    path: "forms/vendor-application",
    loadComponent: () => import('src/app/pages/vendor-application/vendor-application-page.component')
      .then(m=>m.VendorApplicationPageComponent)
  },
  {
    path: "logout",
    loadComponent: ()=>import('src/app/pages/logout/logout.component')
      .then(m=>m.LogoutComponent),
  },

  // declare core application utility routes
  {
    path: "callback",
    component: Auth0CallbackComponent
  },
  {
    path: "forbidden",
    component: AccessDeniedComponent,
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
