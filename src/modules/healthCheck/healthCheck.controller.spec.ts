import { ConfigService } from "@nestjs/config";
import { HealthCheckResult, HealthCheckService, MicroserviceHealthIndicator } from "@nestjs/terminus";
import { Test, TestingModule } from "@nestjs/testing";

import { HealthCheckController } from "@/modules/healthCheck/healthCheck.controller";

describe("HealthCheckController", () => {
  let healthCheckController: HealthCheckController;
  let healthService: HealthCheckService;

  beforeEach(async () => {
    const mocks = { check: jest.fn(), pingCheck: jest.fn(), get: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [
        { provide: HealthCheckService, useValue: { check: mocks.check } },
        {
          provide: MicroserviceHealthIndicator,
          useValue: { pingCheck: mocks.pingCheck },
        },
        { provide: ConfigService, useValue: { get: mocks.get } },
      ],
    }).compile();

    healthCheckController = module.get<HealthCheckController>(HealthCheckController);
    healthService = module.get<HealthCheckService>(HealthCheckService);
  });

  describe("check", () => {
    it("should return expected health check result", async () => {
      // Arrange
      const expectedResult: HealthCheckResult = {
        status: "ok",
        info: { microservice: { status: "up" } },
        error: {},
        details: { microservice: { status: "up" } },
      };

      jest.spyOn(healthService, "check").mockResolvedValue(expectedResult);

      // Act
      const result = await healthCheckController.check();

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
