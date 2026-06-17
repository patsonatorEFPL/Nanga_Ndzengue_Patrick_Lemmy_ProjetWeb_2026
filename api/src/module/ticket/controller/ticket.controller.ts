import { Controller, Get } from '@nestjs/common';
import { TicketService } from '../service/ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private service: TicketService) {}

  @Get('list')
  list() {
    return this.service.list();
  }
}
