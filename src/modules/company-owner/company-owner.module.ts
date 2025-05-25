import { Module } from '@nestjs/common';
import { CompanyOwnerService } from './company-owner.service';
import { CompanyOwnerController } from './company-owner.controller';
import { PrismaService } from '@database/PrismaService';

@Module({
  providers: [CompanyOwnerService, PrismaService],
  controllers: [CompanyOwnerController],
})
export class CompanyOwnerModule {}
