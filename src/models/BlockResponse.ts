import { ApiProperty } from "@nestjs/swagger";
import { Block } from "./Block";

export class BlockResponse {
  @ApiProperty()
  block: Block
}
