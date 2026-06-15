import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';
import { Parking } from '@parking';

@Entity()
export class Ticket {
  @PrimaryColumn({ type: 'varchar', length: 26, default: () => `'${ulid()}'` })
  ticket_id: string;

  @Column()
  immatriculation: string;

  @Column()
  entree: Date;

  @Column({ nullable: true })
  sortie: Date;

  @Column({ default: 0 })
  montant: number;

  @ManyToOne(() => Parking, (parking) => parking.tickets)
  parking: Parking;
}
