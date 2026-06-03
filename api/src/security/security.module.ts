import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityController } from './controller';
import { SecurityService } from './service';
import { JwtGuard } from './guard';
import { Credential } from './entities';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Credential]),
  ],
  controllers: [SecurityController],
  providers: [
    SecurityService,
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class SecurityModule {}
