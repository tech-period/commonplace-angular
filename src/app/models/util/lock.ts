/**
 * 複数同時に処理を実行させないように排他制御を行うクラス
 */
export class Lock {
  private locked = false;
  private queue: (() => void)[] = [];

  /**
   * ロックを取得し、releaseメソッドが呼ばれるまで次の処理を待機する
   */
  async acquireAsync(): Promise<void> {
    if (this.locked) {
      await new Promise<void>(resolve => this.queue.push(resolve));
    }
    this.locked = true;
    this.logWithStack('lock acquired');
  }
  
  /**
   * ロックを解放する
  */
  release(): void {
    this.locked = false;
    const next = this.queue.shift();
    if (next) {
      next();
    }
    this.logWithStack('lock acquired');
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
