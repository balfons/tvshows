/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 * The function will be called after it stops being called for N milliseconds
 *
 * Example usage:
 * const debouncedMyFunction = debounce(myFunction, 200);
 * debouncedMyFunction(someData);
 *
 * @template F
 * @param {F} func
 * @param {number} waitFor
 * @return {*}  {(...args: Parameters<F>) => Promise<ReturnType<F>>}
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => Promise<ReturnType<F>>) => {
  let timeout: undefined | number;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = window.setTimeout(() => resolve(func(...args)), waitFor);
    });
};
