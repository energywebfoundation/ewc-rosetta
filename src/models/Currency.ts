export class Currency {
  constructor(public symbol: string, public decimals: number) {}

  static get EWT() {
    return new Currency("EWT", 18);
  }
}
