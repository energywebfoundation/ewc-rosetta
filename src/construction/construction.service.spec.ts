import { Test, TestingModule } from "@nestjs/testing";
import { ConstructionService } from "./construction.service";
import { ethers } from "ethers";

describe("ConstructionService", () => {
  let service: ConstructionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstructionService],
    }).compile();

    service = module.get<ConstructionService>(ConstructionService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return derived address from public key", async () => {
    const { publicKey, address } = ethers.Wallet.createRandom();

    const derivedAddress = service.derive(publicKey);

    expect(derivedAddress).toBe(address);
  });
});
