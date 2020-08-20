import { CurveType } from "./CurveType";
import { Errors } from "./Errors";

export class PublicKey {
  constructor(public hex_bytes: string, public curve_type: CurveType) {}

  static validate(publicKey: PublicKey) {
    if (publicKey.curve_type !== CurveType.secp256k1) {
      return Errors.CURVE_NOT_SUPPORTED;
    }

    return null;
  }
}
