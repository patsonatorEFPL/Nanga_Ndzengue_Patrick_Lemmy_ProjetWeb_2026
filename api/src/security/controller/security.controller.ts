import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SecurityService } from '../service';
import { SignInPayload, SignupPayload } from '../model';
import { Public, User } from '../metadata';
import { Credential } from '../entities';

@ApiBearerAuth('access-token')
@ApiTags('Security')
@Controller('security')
export class SecurityController {
  constructor(private readonly service: SecurityService) {}

  @Public()
  @Post('sign-in')
  public signIn(@Body() payload: SignInPayload) {
    return this.service.signIn(payload);
  }

  @Public()
  @Post('sign-up')
  public signUp(@Body() payload: SignupPayload) {
    return this.service.signUp(payload);
  }

  @Get('me')
  public me(@User() user: Partial<Credential>) {
    return user;
  }
}
