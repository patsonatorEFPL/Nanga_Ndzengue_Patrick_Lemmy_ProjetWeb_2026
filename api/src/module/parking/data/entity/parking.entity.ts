import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ulid } from 'ulid';
import { Ticket } from '@ticket';

@Entity()
export class Parking {
  @PrimaryColumn('varchar', { length: 26 })
  parking_id: string;

  @Column()
  nom: string;

  @Column()
  adresse: string;

  @Column()
  capacite: number;

  @Column()
  tarif_horaire: number;

  @OneToMany(() => Ticket, (ticket) => ticket.parking, {
    cascade: true,
    eager: true,
  })
  tickets: Ticket[];

  @BeforeInsert()
  generateId() {
    if (!this.parking_id) {
      this.parking_id = ulid();
    }
  }
}
