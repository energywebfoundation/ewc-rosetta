import { Module } from "@nestjs/common";
import { BlockModule } from "./block/block.module";
import { ConstructionModule } from "./construction/construction.module";
import { AccountModule } from "./account/account.module";
import { NetworkModule } from "./network/network.module";
import { MempoolModule } from "./mempool/mempool.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { HTTPLoggingInterceptor } from "./HTTPLoggingInterceptor";

@Module({
  imports: [
    BlockModule,
    AccountModule,
    MempoolModule,
    ConstructionModule,
    NetworkModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: HTTPLoggingInterceptor }],
})
export class AppModule {}
