import {Routes} from "@angular/router";
import {HasPermission} from "src/guards/permission.guard";
import {Auth0CallbackComponent} from "src/components/auth0-callback/auth0-callback.component";
import {AccessDeniedComponent} from "src/pages/access-denied/access-denied.component";
import {AdminService} from "../app-admin-portal/services/admin.service";
import {NotImplementedComponent} from "src/pages/not-implemented/not-implemented.component";
import {LogoutComponent} from "src/pages/logout/logout.component";
import {VendorService} from "../app-vendor-portal/services/vendor.service";
import {ShoppingCartService} from "../app-customer-portal/services/shopping-cart.service";


export const AppRoutes: Routes = [
  // declare portal routes
  {
    title: "K&M Co.",
    path: "",
    providers: [ShoppingCartService],
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
        loadComponent: () => import('src/app-customer-portal/pages/browse-products/browse-products-page.component')
          .then(m=>m.BrowseProductsPageComponent)
      },
      {
        path: "shop/product/:product_id",
        loadComponent: () => import('src/app-customer-portal/pages/product-details/product-page.component')
          .then(m=>m.ProductDetailsPageComponent)
      },
      {
        path: "shop/cart",
        canActivate: [HasPermission('cmx_coffee:appuser')],
        loadComponent: () => import('src/app-customer-portal/pages/shopping-cart/shopping-cart-page.component')
          .then(m=>m.ShoppingCartPageComponent)
      },
      {
        path: "shop/checkout",
        canActivate: [HasPermission('cmx_coffee:appuser')],
        loadComponent: ()=>import('src/app-customer-portal/pages/checkout/checkout-page.component')
          .then(m=>m.CheckoutPageComponent)
      },
      {
        path: "plans",
        canActivate: [HasPermission('cmx_coffee:appuser')],
        loadComponent: () => import('src/app-customer-portal/pages/subscription-plans/subscription-plans-page.component')
          .then(m=>m.SubscriptionPlansPageComponent)
      },
      {
        path: "account",
        canActivate: [HasPermission('cmx_coffee:appuser')],
        loadComponent: () => import('src/app-customer-portal/pages/account/account-page.component')
          .then(m=>m.AccountPageComponent),
        children: [
          {
            path: "profile",
            loadComponent: () => import('src/app-customer-portal/pages/account-profile/account-profile-page.component')
              .then(m=>m.AccountProfilePageComponent),
          },
          {
            path: "orders",
            loadComponent: () => import('src/app-customer-portal/pages/account-orders/account-orders-page.component')
              .then(m=>m.AccountOrdersPageComponent),
          },
          {
            path: "payments",
            loadComponent: () => import('src/app-customer-portal/pages/account-payments/account-payments-page.component')
              .then(m=>m.AccountPaymentsPageComponent),
          },
          {
            path: "advanced",
            loadComponent: () => import('src/app-customer-portal/pages/account-advanced-actions/account-advanced-actions-page.component')
              .then(m=>m.AccountAdvancedActionsPageComponent),
          },
        ]
      },
      {
        path: "forms/vendor-application",
        canActivate: [HasPermission('cmx_coffee:appuser')],
        loadComponent: () => import('src/app-customer-portal/pages/forms-vendor-application/vendor-application-page.component')
          .then(m=>m.VendorApplicationPageComponent)
      },
      {
        path: "track",
        loadComponent: () => import('src/app-customer-portal/pages/track-order/track-page.component')
          .then(m=>m.TrackPageComponent)
      }
    ]
  },
  {
    title: "K&M Vendors",
    path: "vendor",
    canActivate: [HasPermission('cmx_coffee:vendor')],
    providers: [VendorService],
    loadComponent: ()=>import('src/app-vendor-portal/vendor-portal.component')
      .then(m=>m.VendorPortalComponent),
    children: [
      {
        path: "product/:productId",
        loadComponent: () => import('src/app-vendor-portal/pages/manage-product-details/manage-product-details-page.component')
          .then(m=>m.ManageProductDetailsPageComponent)
      },
      {
        path: "products",
        loadComponent: ()=>import('src/app-vendor-portal/pages/manage-products/manage-products-page.component')
          .then(m=>m.ManageProductsPageComponent)
      },
      {
        path: "create-product",
        loadComponent: ()=>import('src/app-vendor-portal/pages/create-product/create-product-page.component')
          .then(m=>m.CreateProductPageComponent)
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
    title: "K&M Admin",
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
