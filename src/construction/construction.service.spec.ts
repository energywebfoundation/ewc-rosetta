import { Test, TestingModule } from "@nestjs/testing";
import { ConstructionService } from "./construction.service";
import { ethers, BigNumber } from "ethers";
import { OperationFactory } from "../models/OperationFactory";

const fundedAccount = ethers.Wallet.createRandom();

const ganache = require("ganache-core"); // eslint-disable-line @typescript-eslint/no-var-requires
ganache
  .server({
    accounts: [
      {
        secretKey: fundedAccount.privateKey,
        balance: "0xc097ce7bc907100000000000000000",
      },
    ],
  })
  .listen(8545);

process.env.WEB3_PROVIDER_URL = "http://localhost:8545";

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

  it("should return hash or signed transaction", async () => {
    const wallet = ethers.Wallet.createRandom();

    const transaction = await wallet.signTransaction({
      to: wallet.address,
      value: 0,
      gasPrice: 10000,
      gasLimit: 21000,
    });

    const { hash } = ethers.utils.parseTransaction(transaction);

    const transactionHash = service.hash(transaction);

    expect(transactionHash).toBe(hash);
  });

  it("should serialize transaction", async () => {
    const operationFactory = new OperationFactory();

    const sender = ethers.Wallet.createRandom().address;
    const receiver = ethers.Wallet.createRandom().address;

    const transfer = operationFactory.transferEWT(
      sender,
      receiver,
      BigNumber.from((10 ** 18).toString()),
      true
    );

    const payload = await service.payloads(transfer);

    expect(payload).toBeDefined();
  });

  it("should parse unsigned transactions", async () => {
    const operationFactory = new OperationFactory();

    const sender = ethers.Wallet.createRandom().address;
    const receiver = ethers.Wallet.createRandom().address;
    const value = BigNumber.from((10 ** 18).toString());

    const transfer = operationFactory.transferEWT(
      sender,
      receiver,
      value,
      true
    );

    const { transaction } = await service.payloads(transfer);

    const result = await service.parse(transaction, false);
    expect(result).toBeDefined();
    expect(result.signer).toBeNull();

    const [to] = result.operations;

    expect(to.account.address).toBe(receiver);
    expect(to.amount.value).toBe(value.toString());
  });

  it("should parse signed transactions", async () => {
    const senderWallet = ethers.Wallet.createRandom();
    const { address: sender } = senderWallet;
    const receiver = ethers.Wallet.createRandom().address;
    const value = BigNumber.from((10 ** 18).toString());

    const signedTransaction = await senderWallet.signTransaction({
      from: sender,
      to: receiver,
      value,
      gasLimit: 21000,
      gasPrice: 1,
    });

    const result = await service.parse(signedTransaction, true);
    expect(result).toBeDefined();
    expect(result.signer).toBe(sender);

    const [from, to] = result.operations;

    expect(from.account.address).toBe(sender);
    expect(from.amount.value).toBe(value.mul(-1).toString());

    expect(to.account.address).toBe(receiver);
    expect(to.amount.value).toBe(value.toString());
  });

  it("should submit signed transaction", async () => {
    const { address: sender } = fundedAccount;
    const receiver = ethers.Wallet.createRandom().address;
    const value = BigNumber.from((10 ** 18).toString());

    const signedTransaction = await fundedAccount.signTransaction({
      from: sender,
      to: receiver,
      value,
      gasLimit: 21000,
      gasPrice: 1,
    });

    const hash = await service.submit(signedTransaction);

    expect(hash).toBeDefined();
  });

  it("should combine unsigned transaction and signatures", async () => {
    const senderWallet = ethers.Wallet.createRandom();
    const { address: sender } = senderWallet;
    const receiver = ethers.Wallet.createRandom().address;
    const value = BigNumber.from((10 ** 18).toString());

    const transaction = {
      to: receiver,
      nonce: 0,
      value,
      gasLimit: 21000,
      gasPrice: 1,
    };

    const unsigned = ethers.utils.serializeTransaction(transaction);

    const signed = await senderWallet.signTransaction({
      ...transaction,
      from: sender,
    });

    const { v, r, s } = ethers.utils.parseTransaction(signed);
    const signature = ethers.utils.joinSignature({ v, r, s });

    const combined = await service.combine(unsigned, signature);

    expect(combined).toBe(signed);
  });
});
