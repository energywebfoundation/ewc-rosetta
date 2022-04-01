import {
  Body,
  Controller,
  HttpException,
  Post,
  HttpCode,
} from "@nestjs/common";
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
import { stripZXPrefix, addZXPrefix } from "../utils/hex";
import { ethers } from "ethers";
import { DynamicRoute } from "../shared/decorators/dynamic-route.decorator";

@Controller("construction")
export class ConstructionController {
  constructor(private constructionService: ConstructionService) { }

  @Post("/derive")
  @HttpCode(200)
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
  @HttpCode(200)
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
  @HttpCode(200)
  public async preprocess(@Body() request: ConstructionPreprocessRequest) {
    const validationResult = ConstructionPreprocessRequest.validate(request);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    const signer = this.constructionService.preprocess(request.operations);

    return {
      options: {
        signer,
      },
    };
  }

  @DynamicRoute(
    Post("/metadata"),
    HttpCode(200)
  )
  public async metadata(@Body() request: ConstructionMetadataRequest) {
    const validationResult = ConstructionMetadataRequest.validate(request);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    const metadata = await this.constructionService.metadata(
      request.options.signer
    );

    return {
      metadata,
    };
  }

  @Post("/payloads")
  @HttpCode(200)
  public async payloads(@Body() request: ConstructionPayloadsRequest) {
    const validationResult = ConstructionPayloadsRequest.validate(request);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    const { transaction, address } = await this.constructionService.payloads(
      request.operations,
      request.metadata
    );

    return {
      unsigned_transaction: transaction,
      payloads: [
        {
          address,
          hex_bytes: stripZXPrefix(ethers.utils.keccak256(transaction)),
          signature_type: SignatureType.EcdsaRecovery,
        },
      ],
    };
  }

  @Post("/parse")
  @HttpCode(200)
  public async parse(@Body() request: ConstructionParseRequest) {
    const validationResult = ConstructionParseRequest.validate(request);

    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    const { operations, signer } = await this.constructionService.parse(
      addZXPrefix(request.transaction),
      request.signed
    );

    return {
      operations,
      signers: signer ? [signer] : [],
    };
  }

  @DynamicRoute(
    Post("/submit"),
    HttpCode(200)
  )
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
  @HttpCode(200)
  public async combine(@Body() request: ConstructionCombineRequest) {
    const signedTransaction = await this.constructionService.combine(
      request.unsigned_transaction,
      addZXPrefix(request.signatures[0].hex_bytes)
    );

    return {
      signed_transaction: signedTransaction,
    };
  }
}
