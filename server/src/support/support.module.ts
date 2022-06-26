import { Module } from "@nestjs/common";
import { SupportModuleBase } from "./base/support.module.base";
import { SupportService } from "./support.service";
import { SupportController } from "./support.controller";
import { SupportResolver } from "./support.resolver";

@Module({
  imports: [SupportModuleBase],
  controllers: [SupportController],
  providers: [SupportService, SupportResolver],
  exports: [SupportService],
})
export class SupportModule {}
