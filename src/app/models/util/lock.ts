/**
 * 複数同時に処理を実行させないように排他制御を行うクラス
 */
export class Lock {
  private promise: Promise<void> = Promise.resolve();
  private resolve: (() => void) | null = null;

  /**
   * ロックを取得し、releaseメソッドが呼ばれるまで次の処理を待機する
   */
  async acquireAsync(): Promise<void> {
    const next = new Promise<void>(resolve => {
      this.resolve = resolve;
    });
    const prev = this.promise;
    this.promise = next;
    await prev;
    this.logWithStack('lock acquired');
  }

  /**
   * ロックを解放する
   */
  release(): void {
    if (this.resolve) {
      this.resolve();
      this.resolve = null;
    }
    this.logWithStack('lock released');
  }

  /**
   * スタックトレースと共にログ出力する
   * @returns
   */
  private logWithStack(message: string): void {
    const stack = new Error().stack || '';
    console.groupCollapsed(message);
    console.log('Stack trace');
    console.log(stack.split('\n').slice(2).join('\n'));
    console.groupEnd();
  }

}
