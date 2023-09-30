import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/auth/prisma.service';
import { RelationModule } from './relation/relation.module';
import { RelationService } from './relation/relation.service';

@Module({
  imports: [RelationModule],
  providers: [RelationService, UsersService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
