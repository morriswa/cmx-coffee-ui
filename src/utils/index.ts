
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};


export const countOccurrences = (arr: Array<any>, val: any) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);


export async function tryTimes<T>(action: ()=>any, times: number, timeout: number = 3): Promise<T | undefined> {
  for (let i = 0; i < times; i++) {
    try {
      return await action();
    } catch (err) {
      console.debug(`error ${i}`, err);
      if (i === times - 1) {
        console.error('finally', err)
        throw err;
      }
    }
    await sleep(timeout * 1000);
  }
  return undefined;
}
