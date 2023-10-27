import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/auth/prisma.service';
import { achievementService } from './gamedata/acheievement.service';
import { HistoryService } from './gamedata/history.service';
// import { RelationModule } from '../relation/relation.module';
// import { RelationService } from '../relation/relation.service';

@Module({
  // imports: [RelationModule],
  providers: [ UsersService, PrismaService,HistoryService, achievementService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
