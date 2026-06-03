import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ulid } from 'ulid';

@Entity()
export class Credential {
  @PrimaryColumn('varchar', { length: 26 })
  credential_id: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: false, unique: true })
  mail: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @BeforeInsert()
  generateId(): void {
    if (!this.credential_id) {
      this.credential_id = ulid();
    }
  }
}
