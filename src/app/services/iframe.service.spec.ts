import { TestBed } from '@angular/core/testing';
import { IframeService } from './iframe.service';
import { IFRAME_ALLOWED_ORIGIN } from '@app/injection-tokens';
import { first } from 'rxjs';

describe('IframeService', () => {
  let service: IframeService;
  const allowedOrigin = 'https://allowed-domain.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IframeService,
        { provide: IFRAME_ALLOWED_ORIGIN, useValue: allowedOrigin }
      ]
    });
    service = TestBed.inject(IframeService);
  });

  it('サービスが作成される', () => {
    expect(service).toBeTruthy();
  });

  it('許可されたオリジンからのメッセージを受信する', (done) => {
    const testMessage = { data: 'test message' };

    service.messageEvent$.pipe(first()).subscribe(event => {
      expect(event.data).toEqual(testMessage.data);
      expect(event.origin).toBe(allowedOrigin);
      done();
    });

    // window.postMessageを使用してメッセージを送信
    window.postMessage(testMessage.data, allowedOrigin);
  });

  it('許可されていないオリジンからのメッセージをフィルタリングする', (done) => {
    const unauthorizedOrigin = 'https://unauthorized-domain.com';
    const testMessage = { data: 'unauthorized message' };
    let messageReceived = false;

    service.messageEvent$.pipe(first()).subscribe({
      next: () => {
        messageReceived = true;
      },
      error: () => {
        messageReceived = true;
      },
      complete: () => {
        expect(messageReceived).toBeFalse();
        done();
      }
    });

    // 未許可のオリジンからpostMessageでメッセージを送信
    window.postMessage(testMessage.data, unauthorizedOrigin);

    setTimeout(() => {
      expect(messageReceived).toBeFalse();
      done();
    }, 100);
  });

  it('全てのメッセージイベントがrawMessageEvent$で受信できる', (done) => {
    const unauthorizedOrigin = 'https://unauthorized-domain.com';
    const testMessage = { data: 'test message' };
    let messageCount = 0;

    const subscription = service.rawMessageEvent$.subscribe({
      next: () => {
        messageCount++;
        if (messageCount === 2) {
          expect(messageCount).toBe(2);
          subscription.unsubscribe();
          done();
        }
      },
      error: (error) => {
        subscription.unsubscribe();
        done.fail(error);
      }
    });

    // メッセージを連続して送信
    window.postMessage(testMessage.data, allowedOrigin);
    window.postMessage(testMessage.data, unauthorizedOrigin);

    // タイムアウト対策
    setTimeout(() => {
      subscription.unsubscribe();
      done.fail('期待された数のメッセージを受信できませんでした');
    }, 2000);
  });

  it('破棄時にサブスクリプションを解除する', () => {
    const unsubscribeSpy = spyOn(service['_messageEventSub'], 'unsubscribe');
    
    service.ngOnDestroy();
    
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

});
