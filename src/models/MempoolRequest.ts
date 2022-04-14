import { ApiProperty } from "@nestjs/swagger";
import { NetworkIdentifier } from "./NetworkIdentifier";
import { TransactionIdentifier } from "./TransactionIdentifer";

export class MainMempoolRequest {
  @ApiProperty()
  network_identifier: NetworkIdentifier;
}

export class MempoolRequest {
  @ApiProperty()
  network_identifier: NetworkIdentifier;
  
  @ApiProperty()
  transaction_identifier: TransactionIdentifier;
  
  constructor(
    network_identifier: NetworkIdentifier,
    transaction_identifier: TransactionIdentifier
  ) {
    this.network_identifier = network_identifier;
    this.transaction_identifier = transaction_identifier;
  }

  static async validate(request: MempoolRequest) {
    const networkValidationResult = NetworkIdentifier.validate(
      request.network_identifier
    );
    const transactionValidationResult = await TransactionIdentifier.validate(
      request.transaction_identifier
    );

    return networkValidationResult || transactionValidationResult;
  }
}
