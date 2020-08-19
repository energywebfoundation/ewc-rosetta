import { getRPCProvider } from "src/utils/client";
import { Errors } from "./Errors";

export class PartialBlockIdentifier {
  constructor(public index?: number, public hash?: string) {}

  static async validate(blockIdentifier: PartialBlockIdentifier) {
    if (blockIdentifier?.hash && blockIdentifier?.index) {
      const provider = getRPCProvider();
      const block = await provider.getBlock(blockIdentifier.index);

      if (!block) {        
        return Errors.BLOCK_NOT_FOUND;  
      }

      if (block.hash !== blockIdentifier.hash) {
        return Errors.BLOCK_HASH_MISMATCH;
      }
    }

    return null;
  }
}
