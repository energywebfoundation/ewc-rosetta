import { Version } from "./Version";
import { Allow } from "./Allow";
import { ApiProperty } from "@nestjs/swagger";

export class NetworkOptionsResponse {
  @ApiProperty()
  version: Version;
  
  @ApiProperty()
  allow: Allow;
  
  constructor(version: Version, allow: Allow) {
    this.version = version;
    this.allow = allow;
  }
}
