import { inject, Injectable, OnDestroy } from '@angular/core';
import { IFRAME_ALLOWED_ORIGIN } from '@app/injection-tokens';
import { filter, fromEvent, Observable, Subject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IframeService implements OnDestroy {

  private _allowedOrigin: URL;

  private _messageEventSub: Subscription;

  // 認可済みオリジンのみにフィルタリングしたメッセージイベント
  private _messageEvent$ = new Subject<MessageEvent>();
  messageEvent$ = this._messageEvent$.asObservable();

  // 受け取った全てのメッセージイベント
  private _rawMessageEvent$ = new Subject<MessageEvent>();
  rawMessageEvent$: Observable<MessageEvent> = this._rawMessageEvent$.asObservable();

  constructor() {
    // moduleのforRootでオリジンを受け取っていたらその値をセット
    const injectedUrl: string | null = inject(IFRAME_ALLOWED_ORIGIN, { optional: true});
    this._allowedOrigin = new URL(injectedUrl ? injectedUrl : '*');

    // 外部から参照できるように一旦プロパティにセット
    this._messageEventSub = fromEvent<MessageEvent>(window, 'message').pipe(
      // 全てのイベントを別のSubjectとして分岐
      tap((e:MessageEvent) => this._rawMessageEvent$.next(e)),
      filter((e:MessageEvent) => new URL(e.origin).href === this._allowedOrigin.href),
    ).subscribe(e => this._messageEvent$.next(e));    
  }

  ngOnDestroy(): void {
    // 購読破棄
    this._rawMessageEvent$.complete();
    this._messageEvent$.complete();
    this._messageEventSub.unsubscribe();
  }
}
