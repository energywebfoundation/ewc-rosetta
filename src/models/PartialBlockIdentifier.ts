import { getRPCProvider } from "src/utils/client";
import { Errors } from "./Errors";
import { BlockIdentifier } from "./BlockIdentifier";

export class PartialBlockIdentifier {
  constructor(public index?: number, public hash?: string) {}

  static async validate(blockIdentifier: PartialBlockIdentifier) {
    if (blockIdentifier?.hash && blockIdentifier?.index) {
      return BlockIdentifier.validate(blockIdentifier as BlockIdentifier);
    }

    const blockId = blockIdentifier?.hash || blockIdentifier?.index;

    const provider = getRPCProvider();
    const block = await provider.getBlock(blockId);

    if (!block) {
      return Errors.BLOCK_NOT_FOUND;
    }

    return null;
  }
}
