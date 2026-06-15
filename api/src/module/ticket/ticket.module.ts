import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './data/entity/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
})
export class TicketModule {}
