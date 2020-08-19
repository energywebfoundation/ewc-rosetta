import { Body, Controller, HttpException, Post } from "@nestjs/common";
import { ConstructionDeriveRequest } from "../models/ConstructionDeriveRequest";

import { ConstructionService } from "./construction.service";
import { ConstructionHashRequest } from "../models/ConstructionHashRequest";
import { TransactionIdentifier } from "../models/TransactionIdentifer";
import { ConstructionPreprocessRequest } from "../models/ConstructionPreprocessRequest";
import { ConstructionMetadataRequest } from "../models/ConstructionMetadataRequest";
import { ConstructionPayloadsRequest } from "../models/ConstructionPayloadsRequest";
import { SignatureType } from "../models/SignatureType";
import { ConstructionParseRequest } from "../models/ConstructionParseRequest";
import { ConstructionSubmitRequest } from "../models/ConstructionSubmitRequest";
import { Errors } from "../models/Errors";
import { ConstructionCombineRequest } from "../models/ConstructionCombineRequest";

@Controller("construction")
export class ConstructionController {
  constructor(private constructionService: ConstructionService) {}

  @Post("/derive")
  public async derive(@Body() request: ConstructionDeriveRequest) {
    const validationResult = ConstructionDeriveRequest.validate(request);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    const address = this.constructionService.derive(
      request.public_key.hex_bytes
    );

    return {
      address,
    };
  }

  @Post("/hash")
  public async hash(@Body() request: ConstructionHashRequest) {
    const validationResult = ConstructionHashRequest.validate(request);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    const hash = this.constructionService.hash(request.signed_transaction);

    return {
      transaction_identifier: new TransactionIdentifier(hash),
    };
  }

  @Post("/preprocess")
  public async preprocess(@Body() request: ConstructionPreprocessRequest) {
    const validationResult = ConstructionPreprocessRequest.validate(request);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return {
      options: {},
    };
  }

  @Post("/metadata")
  public async metadata(@Body() request: ConstructionMetadataRequest) {
    const validationResult = ConstructionMetadataRequest.validate(request);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return {
      metadata: {},
    };
  }

  @Post("/payloads")
  public async payloads(@Body() request: ConstructionPayloadsRequest) {
    const validationResult = ConstructionPayloadsRequest.validate(request);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    const { transaction, address } = await this.constructionService.payloads(
      request.operations
    );

    return {
      unsigned_transaction: transaction,
      payloads: [
        {
          address,
          hex_bytes: transaction,
          signature_type: SignatureType.Ecdsa,
        },
      ],
    };
  }

  @Post("/parse")
  public async parse(@Body() request: ConstructionParseRequest) {
    const validationResult = ConstructionParseRequest.validate(request);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return this.constructionService.parse(request.transaction, request.signed);
  }

  @Post("/submit")
  public async submit(@Body() request: ConstructionSubmitRequest) {
    const validationResult = ConstructionSubmitRequest.validate(request);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    try {
      const hash = await this.constructionService.submit(
        request.signed_transaction
      );

      return {
        transaction_identifier: new TransactionIdentifier(hash),
      };
    } catch (error) {
      throw new HttpException(Errors.TX_RELAY_ERROR, 500);
    }
  }

  @Post("/combine")
  public async combine(@Body() request: ConstructionCombineRequest) {
    const signedTransaction = await this.constructionService.combine(
      request.unsigned_transaction,
      request.signatures[0].hex_bytes
    );

    return {
      signed_transaction: signedTransaction,
    };
  }
}
