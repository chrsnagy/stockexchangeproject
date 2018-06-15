export class StockValue {
    constructor(
        public date: string,
        public value: string
    ) { }
}
export class Stock {
    constructor(
      public name: string,
      public values: StockValue[]
    ) { }
}
