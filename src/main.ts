import { bootstrapApplication } from '@angular/platform-browser';
import { isDevMode } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// 開発時はAngularアプリケーションを起動する直前にService Workerを立ち上げる
async function prepareApp() {
  if(isDevMode()) {
    const { worker } = await import('./mock/setup');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}

prepareApp().then(() => {
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
});
