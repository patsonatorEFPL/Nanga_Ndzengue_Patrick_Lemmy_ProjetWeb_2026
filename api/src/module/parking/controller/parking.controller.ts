import { Controller, Get, Param } from '@nestjs/common';
import { ParkingService } from '../service/parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private service: ParkingService) {}

  @Get('list')
  list() {
    return this.service.list();
  }

  @Get('detail/:id')
  detail(@Param('id') id: string) {
    return this.service.detail(id);
  }
}
