/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/docs/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { DeleteSupportArgs } from "./DeleteSupportArgs";
import { SupportFindManyArgs } from "./SupportFindManyArgs";
import { SupportFindUniqueArgs } from "./SupportFindUniqueArgs";
import { Support } from "./Support";
import { SupportService } from "../support.service";

@graphql.Resolver(() => Support)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class SupportResolverBase {
  constructor(
    protected readonly service: SupportService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Support",
    action: "read",
    possession: "any",
  })
  async _supportsMeta(
    @graphql.Args() args: SupportFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Support])
  @nestAccessControl.UseRoles({
    resource: "Support",
    action: "read",
    possession: "any",
  })
  async supports(
    @graphql.Args() args: SupportFindManyArgs
  ): Promise<Support[]> {
    return this.service.findMany(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Support, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Support",
    action: "read",
    possession: "own",
  })
  async support(
    @graphql.Args() args: SupportFindUniqueArgs
  ): Promise<Support | null> {
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => Support)
  @nestAccessControl.UseRoles({
    resource: "Support",
    action: "delete",
    possession: "any",
  })
  async deleteSupport(
    @graphql.Args() args: DeleteSupportArgs
  ): Promise<Support | null> {
    try {
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
