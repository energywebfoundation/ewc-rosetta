import { PublicKey } from "./PublicKey";
import { SignatureType } from "./SignatureType";

export class Signature {
  constructor(
    public signing_payload: any,
    public public_key: PublicKey,
    public signature_type: SignatureType,
    public hex_bytes: string
  ) {}
}
