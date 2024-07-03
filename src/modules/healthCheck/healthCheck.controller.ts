import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TcpClientOptions, Transport } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
} from "@nestjs/terminus";

@ApiTags("health-check")
@Controller("health-check")
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const port = this.configService.get<number>("PORT", 8080);
    const host = this.configService.get<string>("HOST", "localhost");

    return this.health.check([
      async () =>
        this.microservice.pingCheck<TcpClientOptions>("tcp-microservice", {
          transport: Transport.TCP,
          options: { host, port },
        }),
    ]);
  }
}
