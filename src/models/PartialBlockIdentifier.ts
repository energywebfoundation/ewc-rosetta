import { getRPCProvider } from "src/utils/client";
import { Errors } from "./Errors";
import { BlockIdentifier } from "./BlockIdentifier";
import { ApiProperty } from "@nestjs/swagger";

export class PartialBlockIdentifier {
  @ApiProperty()
  index?: number;

  @ApiProperty()
  hash?: string;
  
  constructor(index?: number, hash?: string) {
    this.index = index;
    this.hash = hash;
  }

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
