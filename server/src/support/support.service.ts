import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { SupportServiceBase } from "./base/support.service.base";

@Injectable()
export class SupportService extends SupportServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
