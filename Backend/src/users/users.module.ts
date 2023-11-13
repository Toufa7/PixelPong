import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/auth/prisma.service';
import { achievementService } from './gamedata/acheievement.service';
import { HistoryService } from './gamedata/history.service';

@Module({
  providers: [ UsersService, PrismaService,HistoryService, achievementService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
