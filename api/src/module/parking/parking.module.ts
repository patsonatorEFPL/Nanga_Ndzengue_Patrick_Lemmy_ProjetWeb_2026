import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from './data/entity/parking.entity';
import { ParkingController } from './controller/parking.controller';
import { ParkingService } from './service/parking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Parking])],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
