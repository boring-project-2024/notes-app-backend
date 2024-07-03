import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "@/app.module";
import { CoreModule } from "@/core/core.module";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  CoreModule.setupSecurity(app);
  logger.log("Security settings initialized.");

  CoreModule.setupSwagger(app, configService);
  logger.log("Swagger setup completed.");

  const port = configService.get<number>("PORT", 8080);
  const environment = configService.get<string>("NODE_ENV", "development");
  const url = configService.get<string>("HOST_URL", "http://localhost:8080");

  await app.listen(port);
  logger.log(`🚀 Server (${environment}) running on: ${url}`);
}
bootstrap();
