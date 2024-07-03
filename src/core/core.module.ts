import { INestApplication, Logger, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

@Module({})
export class CoreModule {
  static setupSecurity(app: INestApplication): void {
    app.enableCors();
    new Logger("SecuritySetup").log("CORS and Helmet configurations have been applied.");
  }

  static setupSwagger(app: INestApplication, configService: ConfigService): void {
    const environment = configService.get<string>("NODE_ENV");
    const logger = new Logger("SwaggerSetup");

    if (environment === "development") {
      const url = configService.get<string>("HOST_URL", "http://localhost:8080");

      const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle("Nest Swagger API")
        .setDescription("The Nest Swagger API description")
        .setExternalDoc("Swagger JSON", `${url}/api-json`)
        .setVersion("1.0")
        .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup("docs", app, document);

      logger.log(`==========================================================`);
      logger.log(`Swagger UI hosted at ${url}/api`);
      logger.log(`==========================================================`);
    } else {
      logger.log("Swagger is disabled in production");
    }
  }
}
