import {provideRouter, Routes} from "@angular/router";
import {EnvironmentProviders} from "@angular/core";
import {HasPermission} from "src/guards/permission.guard";
import {Auth0CallbackComponent} from "src/components/auth0-callback/auth0-callback.component";
import {AccessDeniedComponent} from "src/pages/access-denied/access-denied.component";
import {AdminService} from "../app-admin-portal/services/admin.service";
import {NotImplementedComponent} from "src/pages/not-implemented/not-implemented.component";
import {LogoutComponent} from "src/pages/logout/logout.component";
import {VendorService} from "../app-vendor-portal/services/vendor.service";


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
        path: "plans",
        canActivate: [HasPermission('cmx_coffee:appuser')],
        loadComponent: () => import('src/app-customer-portal/pages/subscription-plans/subscription-plans-page.component')
          .then(m=>m.SubscriptionPlansPageComponent)
      },
      {
        path: "profile",
        canActivate: [HasPermission('cmx_coffee:appuser')],
        loadComponent: () => import('src/app-customer-portal/pages/customer-profile/customer-profile-page.component')
          .then(m=>m.CustomerProfilePageComponent)
      },
      {
        path: "forms/vendor-application",
        canActivate: [HasPermission('cmx_coffee:appuser')],
        loadComponent: () => import('src/app-customer-portal/pages/vendor-application/vendor-application-page.component')
          .then(m=>m.VendorApplicationPageComponent)
      },
    ]
  },
  {
    title: "Vendor Settings",
    path: "vendor",
    canActivate: [HasPermission('cmx_coffee:vendor')],
    providers: [VendorService],
    loadComponent: ()=>import('src/app-vendor-portal/vendor-portal.component')
      .then(m=>m.VendorPortalComponent),
    children: [
      {
        path: "product/:productId",
        loadComponent: () => import('src/app-vendor-portal/pages/vendor-manage-product-details/vendor-manage-product-details-page.component')
          .then(m=>m.VendorManageProductDetailsPageComponent)
      },
      {
        path: "products",
        loadComponent: ()=>import('src/app-vendor-portal/pages/manage-products/manage-products-page.component')
          .then(m=>m.ManageProductsPageComponent)
      },
      {
        path: "**",
        redirectTo: "products"
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
