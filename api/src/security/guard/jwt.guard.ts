import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { SecurityService } from '../service/security.service';
import { BadCredentialsException } from '../data/exception/bad-credentials.exception';
import { configManager } from '@common/config/config-manager';
import { ConfigKey } from '@common/config/enum/config-key.enum';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private securityService: SecurityService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'];
    if (!auth) {
      throw new BadCredentialsException();
    }
    try {
      const payload = this.jwtService.verify(auth.replace('Bearer ', ''), {
        secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
      });
      request.user = await this.securityService.detail(payload.sub);
      return true;
    } catch {
      throw new BadCredentialsException();
    }
  }
}
