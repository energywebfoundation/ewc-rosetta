import { ApiProperty } from "@nestjs/swagger";

export class SubAccountIdentifier {
  @ApiProperty()
  address: string;
  
  @ApiProperty()
  metadata:any;
  
  constructor(address: string, metadata:any) {
    this.address = address;
    this.metadata = metadata;
  }
}
