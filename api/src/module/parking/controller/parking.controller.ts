import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ParkingService } from '../service/parking.service';
import { ParkingPayload } from '../data/payload/parking.payload';

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

  @Post('create')
  create(@Body() payload: ParkingPayload) {
    return this.service.create(payload);
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() payload: ParkingPayload) {
    return this.service.update(id, payload);
  }
}
