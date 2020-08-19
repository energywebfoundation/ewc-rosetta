import { SignatureType } from "./SignatureType";

export class SigningPayload {
  constructor(
    public address: string,
    public hex_bytes: string,
    public signature_type?: SignatureType
  ) {}
}
