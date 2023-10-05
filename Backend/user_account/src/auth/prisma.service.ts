import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  // profileImage: string;
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }
}
