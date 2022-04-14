import { ApiProperty } from "@nestjs/swagger";
import { SignatureType } from "./SignatureType";

class Payload {
  @ApiProperty()
  hex_bytes: string;
  
  @ApiProperty()
  address: string;
  
  @ApiProperty({ enum: SignatureType })
  signature_type: SignatureType
}

export class ConstructionPayloadResponse {
  @ApiProperty()
  unsigned_transaction: string;

  @ApiProperty({ type: [Payload] })
  payloads: Payload[]
}
