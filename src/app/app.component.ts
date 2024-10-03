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


@Component({
  selector: "app-root",
  template: `
    @if (loading()) {
      <h1>Loading</h1>
    } @else {
      <router-outlet/>
    }
  `,
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private routerEventSubscription?: Subscription;

  protected loading: WritableSignal<boolean> = signal(false);

  ngOnInit() {
    this.routerEventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading.set(true);
      } else if (
           event instanceof NavigationEnd
        || event instanceof NavigationCancel
        || event instanceof NavigationError
      ) {
        this.loading.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventSubscription?.unsubscribe();
  }
}
