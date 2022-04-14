import { ApiProperty } from "@nestjs/swagger";
import { PublicKey } from "./PublicKey";
import { SignatureType } from "./SignatureType";

class SigningPayload {
  @ApiProperty()
  address: string;

  @ApiProperty()
  hex_bytes: string;

  @ApiProperty({ enum: SignatureType })
  signatureType: SignatureType
}

export class Signature {
  @ApiProperty()
  signing_payload: SigningPayload;
  
  @ApiProperty()
  public_key: PublicKey;
  
  @ApiProperty({ enum: SignatureType })
  signature_type: SignatureType;
  
  @ApiProperty()
  hex_bytes: string;
  
  constructor(
    signing_payload: any,
    public_key: PublicKey,
    signature_type: SignatureType,
    hex_bytes: string
  ) {
    this.signature_type = signature_type;
    this.signing_payload = signing_payload;
    this.public_key = public_key;
    this.hex_bytes = hex_bytes;
  }
}
