import { ApiProperty } from "@nestjs/swagger";
import { CurveType } from "./CurveType";
import { Errors } from "./Errors";

export class PublicKey {
  @ApiProperty()
  hex_bytes: string;
  
  @ApiProperty({ enum: CurveType })
  curve_type: CurveType

  constructor(hex_bytes: string, curve_type: CurveType) {
    this.curve_type = curve_type;
    this.hex_bytes = hex_bytes;
  }

  static validate(publicKey: PublicKey) {
    if (publicKey.curve_type !== CurveType.secp256k1) {
      return Errors.CURVE_NOT_SUPPORTED;
    }

    return null;
  }
}
