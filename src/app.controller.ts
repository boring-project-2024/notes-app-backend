import { Controller, Get } from "@nestjs/common";

import { ServiceResponse } from "@/core/core.interface";
import { ApiTags } from "@nestjs/swagger";

@Controller()
export class AppController {
  @Get("/health")
  @ApiTags("Health")
  health() {
    return ServiceResponse.success("Service is healthy", null);
  }
}
