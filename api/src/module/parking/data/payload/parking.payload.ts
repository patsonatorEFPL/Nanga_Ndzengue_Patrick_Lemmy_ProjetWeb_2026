import { ApiProperty } from '@nestjs/swagger';

export class ParkingPayload {
  @ApiProperty()
  nom: string;

  @ApiProperty()
  adresse: string;

  @ApiProperty()
  capacite: number;

  @ApiProperty()
  tarif_horaire: number;
}
