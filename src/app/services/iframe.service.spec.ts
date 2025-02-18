import { TestBed } from '@angular/core/testing';
import { IframeService } from './iframe.service';
import { IFRAME_ALLOWED_ORIGIN } from '@app/injection-tokens';
import { firstValueFrom } from 'rxjs';

describe('IframeService', () => {
  let service: IframeService;
  // テストランタイムでサーブされるURLを設定
  const allowedOrigin = 'http://localhost:9876';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IframeService,
        { provide: IFRAME_ALLOWED_ORIGIN, useValue: allowedOrigin }
      ]
    });
    service = TestBed.inject(IframeService);
  });

  it('許可されたオリジンからのメッセージを受信する', async () => {
    const testMessage = 'test message';
    window.postMessage(testMessage, allowedOrigin);
    const result = await firstValueFrom(service.messageEvent$);
    expect(result.data).toEqual(testMessage);
  });

  it('破棄時にサブスクリプションを解除する', () => {
    const unsubscribeSpy = spyOn(service['_messageEventSub'], 'unsubscribe');
    
    service.ngOnDestroy();
    
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

});
