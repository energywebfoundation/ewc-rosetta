export class TransactionMetadata {
  constructor(
    public nonce: number,
    public gasPrice: string,
    public chainId: number
  ) {}
}
