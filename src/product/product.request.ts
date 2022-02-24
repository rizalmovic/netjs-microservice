export class ProductRequest {
  constructor(
    public readonly name: string,
    public readonly desc: string,
    public readonly price: number,
    public readonly quantity: number,
    public readonly status: boolean,
  ) {}

  toString() {
    return JSON.stringify({
      name: this.name,
      desc: this.desc,
      price: this.price,
      quantity: this.quantity,
      status: this.status,
    });
  }
}
