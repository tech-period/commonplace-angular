import { Lock } from './lock';

describe('Lock', () => {
  let lock: Lock;
  
  beforeEach(() => {
    lock = new Lock();
  });

  it('should acquire and release lock', async () => {
    await lock.acquireAsync();
    lock.release();
  });

  it('should ensure exclusive execution', async () => {
    let counter = 0;
    const execOrder: number[] = [];

    const task = async (id:number) => {
      await lock.acquireAsync();
      try {
        const current = counter;
        await new Promise(resolve => setTimeout(resolve, 1));
        counter = current + 1;
        execOrder.push(id);
      } finally {
        lock.release();
      }
    };

    await Promise.all([task(1), task(2), task(3)]);

    expect(counter).toBe(3);
    expect(execOrder).toEqual([1, 2, 3]);
  });

});