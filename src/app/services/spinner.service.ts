import { Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

import { SpinnerComponent } from '../components/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
  ) {
    const overlayStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: overlayStrategy
    });
  }

  show(): void {
    this.overlayRef.attach(new ComponentPortal(SpinnerComponent));
  }

  hide(): void {
    this.overlayRef.detach();
  }
}
