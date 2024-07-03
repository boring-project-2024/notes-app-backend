import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";

import { HealthCheckController } from "@/modules/healthCheck/healthCheck.controller";

@Module({
  imports: [TerminusModule.forRoot({ errorLogStyle: "pretty" })],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
