import { Errors } from "./Errors";
import { getRPCProvider } from "../utils/client";

export class BlockIdentifier {
  constructor(public index: number, public hash: string) {}

  static async validate(blockIdentifier: BlockIdentifier) {
    if (!blockIdentifier?.hash || !blockIdentifier?.index) {
      return Errors.BLOCK_REQUIRED;
    }

    const provider = getRPCProvider();
    const block = await provider.getBlock(blockIdentifier.index);

    if (!block) {
      return Errors.BLOCK_NOT_FOUND;
    }

    if (block.hash !== blockIdentifier.hash) {
      return Errors.BLOCK_HASH_MISMATCH;
    }
  }
}
