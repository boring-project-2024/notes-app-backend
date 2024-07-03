import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import configuration from "@/config";
import { APP_GUARD } from "@nestjs/core";
import { HealthCheckModule } from "@/modules/healthCheck/healthCheck.module";

@Module({
  imports: [
    HealthCheckModule,
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 50 }]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
