import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SecurityService } from '../service/security.service';
import { TokenService } from '../service/token.service';
import { SignInPayload } from '../data/payload/sign-in.payload';
import { SignUpPayload } from '../data/payload/sign-up.payload';
import { RefreshTokenPayload } from '../data/payload/refresh-token.payload';
import { Public } from '../decorator/public.decorator';
import { User } from '../decorator/user.decorator';
import { CredentialEntity } from '../data/entity/credential.entity';

@ApiBearerAuth('access-token')
@ApiTags('Security')
@Controller('security')
export class SecurityController {
  constructor(
    private securityService: SecurityService,
    private tokenService: TokenService,
  ) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() payload: SignUpPayload) {
    return this.securityService.signUp(payload);
  }

  @Public()
  @Post('sign-in')
  signIn(@Body() payload: SignInPayload) {
    return this.securityService.signIn(payload);
  }

  @Public()
  @Post('refresh')
  refresh(@Body() payload: RefreshTokenPayload) {
    return this.tokenService.refresh(payload.refreshToken);
  }

  @Get('me')
  me(@User() user: CredentialEntity) {
    return user;
  }
}
