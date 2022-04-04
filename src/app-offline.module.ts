import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

import { ConstructionModule } from "./construction/construction.module";
import { HTTPLoggingInterceptor } from "./HTTPLoggingInterceptor";
import { NetworkModule } from "./network/network.module";

@Module({
  imports: [ConstructionModule, NetworkModule],
  providers: [{ provide: APP_INTERCEPTOR, useClass: HTTPLoggingInterceptor }],
})
export class AppOfflineModule { }
