import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parking } from '../data/entity/parking.entity';
import { ParkingPayload } from '../data/payload/parking.payload';

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

  create(payload: ParkingPayload) {
    return this.repository.save(this.repository.create(payload));
  }

  async update(id: string, payload: ParkingPayload) {
    await this.repository.update({ parking_id: id }, payload);
    return this.repository.findOneBy({ parking_id: id });
  }

  delete(id: string) {
    return this.repository.delete({ parking_id: id });
  }
}
