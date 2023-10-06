import { Injectable } from '@nestjs/common';
// import { Socket } from 'socket.io';
import { PrismaService } from 'src/auth/prisma.service';
import { GateWayModule } from './gateaway.module';

@Injectable()
export class GateWayService {
  constructor(private prismaservice: PrismaService) {}
  async createnotification(data) {
    await this.prismaservice.notification.create({
      data: {
        userId: data.userId,
        type: data.type,
        from: data.to,
        message: data.message,
        username: data.username,
        photo: data.photo,
      },
    });
  }
}
