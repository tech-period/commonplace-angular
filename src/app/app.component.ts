import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { NavListComponent } from './components/nav-list/nav-list.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    NavbarComponent,
    NavListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  isSidenavOpened: boolean = false;
  private breakpointStateSub$: Subscription;
  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
    this.breakpointStateSub$ = this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
      ])
      .pipe(
        distinctUntilChanged((prev, curr) =>
          prev.matches === curr.matches
        ),
      )
      .subscribe((state) => {
        console.log('state', state);
        this.isSidenavOpened = state.matches;
      });
  }

  ngOnDestroy() {
    this.breakpointStateSub$.unsubscribe();
  }
}
