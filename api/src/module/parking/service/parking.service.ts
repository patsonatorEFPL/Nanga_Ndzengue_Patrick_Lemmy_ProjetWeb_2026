import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parking } from '../data/entity/parking.entity';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(Parking)
    private repository: Repository<Parking>,
  ) {}

  list() {
    return this.repository.find();
  }

  detail(id: string) {
    return this.repository.findOneBy({ parking_id: id });
  }
}
