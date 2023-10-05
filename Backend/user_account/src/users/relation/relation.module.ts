import { Module } from '@nestjs/common';
import { PrismaService } from 'src/auth/prisma.service';
import { RelationService } from './relation.service';
import { RelationController } from './relation.controller';

Module({
  controllers: [RelationController],
  providers: [PrismaService, RelationService],
  exports: [RelationService],
});
export class RelationModule {}
