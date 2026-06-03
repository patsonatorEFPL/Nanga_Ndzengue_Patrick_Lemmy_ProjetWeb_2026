import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SecurityService } from '../service';
import { SignInPayload, SignupPayload } from '../model';

@ApiTags('Account')
@Controller('security')
export class SecurityController {
  constructor(private readonly service: SecurityService) {}

  @Post('sign-in')
  public signIn(@Body() payload: SignInPayload) {
    return this.service.signIn(payload);
  }

  @Post('sign-up')
  public signUp(@Body() payload: SignupPayload) {
    return this.service.signUp(payload);
  }
}
