import { ApiProperty } from '@nestjs/swagger';

export class SignUpPayload {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  mail: string;
}
