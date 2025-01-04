import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isSmall: boolean = false;
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
        this.isSmall = state.matches;
      });
  }

  ngOnDestroy() {
    this.breakpointStateSub$.unsubscribe();
  }
}
