import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal
} from "@angular/core";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet
} from "@angular/router";
import {Subscription} from "rxjs";
import {FullscreenAppLoaderComponent} from "src/components/fullscreen-app-loader/fullscreen-app-loader.component";
import {LoginService} from "src/services/login.service";


@Component({
  selector: "app-root",
  template: `
    @if (resolvingRoute() || !login.ready()) {
      <app-fullscreen-loader/>
    } @else {
      <router-outlet/>
    }
  `,
  standalone: true,
  imports: [
    RouterOutlet,
    FullscreenAppLoaderComponent
  ],
  host: {'class': 'flex-child'}
})
export class AppComponent implements OnInit, OnDestroy {

  // services
  login = inject(LoginService);
  router = inject(Router);


  // state
  resolvingRoute: WritableSignal<boolean> = signal(false);

  private routerEventSubscription?: Subscription;


  // lifecycle
  ngOnInit() {
    this.routerEventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.resolvingRoute.set(true);
      } else if (
           event instanceof NavigationEnd
        || event instanceof NavigationCancel
        || event instanceof NavigationError
      ) {
        this.resolvingRoute.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventSubscription?.unsubscribe();
  }
}
