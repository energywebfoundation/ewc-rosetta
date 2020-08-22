import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppOnlineModule } from "./app-online.module";
import { inOfflineMode } from "./utils/client";
import { AppOfflineModule } from "./app-offline.module";

require("dotenv").config();

async function bootstrap() {
  const module = inOfflineMode() ? AppOfflineModule : AppOnlineModule;
  const app = await NestFactory.create(module);

  const options = new DocumentBuilder()
    .setTitle("ewc-rosetta")
    .setDescription("Energy Web Chain Rosetta API description")
    .setVersion(process.env.API_SPEC_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(8080);
}
bootstrap();
