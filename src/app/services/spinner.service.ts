import { Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

import { SpinnerComponent } from '../components/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private overlayRef: OverlayRef;
  private stateList: Set<string> = new Set<string>();

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

  show(): string {
    const id = this.createNewState();
    this.stateList.add(id);
    this.overlayRef.attach(
      new ComponentPortal(SpinnerComponent)
    );
    return id;
  }

  hide(id: string): void {
    this.stateList.delete(id);
    if(this.stateList.size < 1) {
      this.overlayRef.detach();
    }
  }

  private createNewState(): string {
    let id: string;
    do {
      id = self.crypto.randomUUID();
    } while (this.stateList.has(id));
    return id;
  }
}
