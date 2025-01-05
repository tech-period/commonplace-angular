import { inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {

  isSmall$ = new BehaviorSubject<boolean>(false);

  constructor() {
    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
      ])
      .pipe(
        distinctUntilChanged((prev, curr) =>
          prev.matches === curr.matches
        ),
      )
      .subscribe(state => this.isSmall$.next(state.matches));
  }

  ngOnDestroy() {
    this.isSmall$.complete();
  }
}
