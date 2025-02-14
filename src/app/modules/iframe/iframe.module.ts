import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFRAME_ALLOWED_ORIGIN } from '@app/injection-tokens';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class IframeModule {
  static forRoot(origin: string): ModuleWithProviders<IframeModule> {
    return {
      ngModule: IframeModule,
      providers: [
        { provide: IFRAME_ALLOWED_ORIGIN, useValue: origin },
      ],
    };
  }
}
