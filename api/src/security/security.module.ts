import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityController } from './controller/security.controller';
import { SecurityService } from './service/security.service';
import { TokenService } from './service/token.service';
import { JwtGuard } from './guard/jwt.guard';
import { CredentialEntity } from './data/entity/credential.entity';
import { TokenEntity } from './data/entity/token.entity';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    TypeOrmModule.forFeature([CredentialEntity, TokenEntity]),
  ],
  controllers: [SecurityController],
  providers: [
    SecurityService,
    TokenService,
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class SecurityModule {}
