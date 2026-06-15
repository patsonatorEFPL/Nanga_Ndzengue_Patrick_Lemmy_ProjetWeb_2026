import { Controller, Get } from '@nestjs/common';
import { ParkingService } from '../service/parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private service: ParkingService) {}

  @Get('list')
  list() {
    return this.service.list();
  }
}
