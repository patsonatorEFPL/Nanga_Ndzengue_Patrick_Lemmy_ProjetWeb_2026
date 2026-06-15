import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityModule } from './security/security.module';
import { ParkingModule } from './module/parking/parking.module';
import { TicketModule } from './module/ticket/ticket.module';
import { configManager } from './common/config/config-manager';

@Module({
  imports: [
    TypeOrmModule.forRoot(configManager.getTypeOrmConfig()),
    SecurityModule,
    ParkingModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
