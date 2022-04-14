import { ApiProperty } from "@nestjs/swagger";
import { Operation } from "./Operation";

export class ConstructionParseResponse {
  @ApiProperty({ type: [Operation] })
  operations: Operation[]

  @ApiProperty({ type: [String]})
  signers: string[]
}
