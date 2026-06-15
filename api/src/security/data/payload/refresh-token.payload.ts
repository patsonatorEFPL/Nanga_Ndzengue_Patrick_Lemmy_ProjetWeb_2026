import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenPayload {
  @ApiProperty()
  refreshToken: string;
}
