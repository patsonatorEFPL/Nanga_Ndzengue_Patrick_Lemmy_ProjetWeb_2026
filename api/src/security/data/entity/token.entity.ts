import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ulid } from 'ulid';
import { CredentialEntity } from './credential.entity';

@Entity()
export class TokenEntity {
  @PrimaryColumn('varchar', { length: 26 })
  token_id: string;

  @Column({ nullable: false })
  token: string;

  @Column({ nullable: false })
  refreshToken: string;

  @OneToOne(() => CredentialEntity, { eager: true })
  @JoinColumn({ name: 'credential_id' })
  credential: CredentialEntity;

  @BeforeInsert()
  generateId(): void {
    if (!this.token_id) {
      this.token_id = ulid();
    }
  }
}
