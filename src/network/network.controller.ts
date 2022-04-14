import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post
} from "@nestjs/common";
import { DynamicRoute } from "../shared/decorators/dynamic-route.decorator";
import { NetworkListResponse } from "../models/NetworkListResponse";
import { NetworkRequest } from "../models/NetworkRequest";
import { NetworkService } from "./network.service";
import { ApiResponse } from "@nestjs/swagger";
import { NetworkOptionsResponse } from "../models/NetworkOptionsResponse";
import { Error as ErrorResponse } from "../models/Error";
import { NetworkStatusResponse } from "../models/NetworkStatusResponse";

@Controller("network")
export class NetworkController {
  constructor(private networkService: NetworkService) { }

  @Post("list")
  @HttpCode(200)
  @ApiResponse({
    status: HttpStatus.OK,
    type: NetworkListResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse
  })
  public async getList() {
    return new NetworkListResponse(this.networkService.networkIdentifiers);
  }

  @Post("options")
  @HttpCode(200)
  @ApiResponse({
    status: HttpStatus.OK,
    type: NetworkOptionsResponse
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponse
  })
  public async getOptions(@Body() body: NetworkRequest) {
    const validationResult = NetworkRequest.validate(body);
    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return this.networkService.networkOptions;
  }

  @DynamicRoute(
    Post("status"),
    HttpCode(200),
    ApiResponse({
      status: HttpStatus.OK,
      type: NetworkStatusResponse
    }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      type: ErrorResponse
    })
  )
  public async getStatus(@Body() body: NetworkRequest) {
    const validationResult = NetworkRequest.validate(body);
    if (validationResult) {
      throw new HttpException(validationResult, 500);
    }

    return this.networkService.getNetworkStatus();
  }
}
