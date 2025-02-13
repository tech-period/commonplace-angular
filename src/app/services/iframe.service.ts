import { inject, Injectable, OnDestroy } from '@angular/core';
import { IFRAME_ALLOWED_ORIGIN } from '@app/injection-tokens';
import { filter, fromEvent, Observable, Subject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IframeService implements OnDestroy {

  private _allowedOrigin: URL;

  // 認可済みオリジンのみにフィルタリングしたメッセージイベント
  messageEvent$: Observable<MessageEvent>;
  private _messageEventSub: Subscription;

  // 受け取った全てのメッセージイベント
  private _rawMessageEvent$ = new Subject<MessageEvent>();
  rawMessageEvent$: Observable<MessageEvent> = this._rawMessageEvent$.asObservable();

  constructor() {
    // moduleのforRootでオリジンを受け取っていたらその値をセット
    const injectedUrl: string | null = inject(IFRAME_ALLOWED_ORIGIN, { optional: true});
    this._allowedOrigin = injectedUrl ? new URL(injectedUrl) : new URL('*');

    // 外部から参照できるように一旦プロパティにセット
    this.messageEvent$ = fromEvent<MessageEvent>(window, 'message').pipe(
      // 全てのイベントを別のSubjectとして分岐
      tap((e:MessageEvent) => this._rawMessageEvent$.next(e)),
      filter((e:MessageEvent) => e.origin === this._allowedOrigin.toString()),
    );
    
    // すぐに購読開始
    this._messageEventSub = this.messageEvent$.subscribe();
  }

  ngOnDestroy(): void {
    // 購読破棄
    this._messageEventSub.unsubscribe();
  }
}
