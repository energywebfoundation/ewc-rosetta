import { Injectable } from "@nestjs/common";
import { ethers } from "ethers";

@Injectable()
export class ConstructionService {
  public derive(bytes: string) {
    return ethers.utils.computeAddress(bytes);
  }
}
