export function PMT(r: number, n: number, p : number, f : number, t: boolean) {
  /*
   * r    - rate
   * n    - num of periods
   * p    - present value
   * f    - future value
   * type - when the payments are due:
   *        true: end of the period, e.g. end of month (default)
   *        false: beginning of period
   */
  if (r === 0) {
    return -1 * (f + p) / n;
  } else {
    const r1 = r + 1;
    return (f + p * Math.pow(r1, n)) * r / ((t ? r1 : 1) * (1 - Math.pow(r1, n)));
  }
}