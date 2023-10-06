import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/auth/prisma.service';
import { RelationService } from './relation/relation.service';
import { RelationController } from './relation/relation.controller';
import { GateWayModule } from 'src/socket/gateaway.module';
import { AuthModule } from 'src/auth/auth.module';
import { SocketGateway } from 'src/socket/socket.gateway';
@Module({
  imports: [GateWayModule],
  providers: [RelationService, UsersService, PrismaService],
  controllers: [UsersController, RelationController],
  exports: [UsersService, RelationService],
})
export class UsersModule {}
