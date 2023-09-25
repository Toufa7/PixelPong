import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendGatewayModule } from './backend-gateway/backend-gateway.module';

@Module({
  imports: [BackendGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
