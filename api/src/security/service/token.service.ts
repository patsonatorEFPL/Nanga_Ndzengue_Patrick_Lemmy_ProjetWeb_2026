import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Builder } from 'builder-pattern';
import { ulid } from 'ulid';
import { CredentialEntity } from '../data/entity/credential.entity';
import { TokenEntity } from '../data/entity/token.entity';
import { BadCredentialsException } from '../data/exception/bad-credentials.exception';
import { TokenGenerationException } from '../data/exception/token-generation.exception';
import { configManager } from '@common/config/config-manager';
import { ConfigKey } from '@common/config/enum/config-key.enum';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    @InjectRepository(TokenEntity)
    private repository: Repository<TokenEntity>,
    private jwtService: JwtService,
  ) {}

  async getTokens(credential: CredentialEntity) {
    try {
      await this.repository.delete({
        credential: { credential_id: credential.credential_id },
      });

      const payload = { sub: credential.credential_id };

      const token = await this.jwtService.signAsync(payload, {
        secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
        expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN) as any,
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET),
        expiresIn: configManager.getValue(
          ConfigKey.JWT_REFRESH_TOKEN_EXPIRE_IN,
        ) as any,
      });

      await this.repository.upsert(
        Builder<TokenEntity>()
          .token_id(ulid())
          .token(token)
          .refreshToken(refreshToken)
          .credential(credential)
          .build(),
        ['credential'],
      );

      return this.repository.findOneBy({ token });
    } catch (e) {
      this.logger.error(e.message);
      throw new TokenGenerationException();
    }
  }

  async refresh(refreshToken: string) {
    try {
      this.jwtService.verify(refreshToken, {
        secret: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET),
      });
    } catch {
      throw new BadCredentialsException();
    }
    const stored = await this.repository.findOne({ where: { refreshToken } });
    if (!stored) {
      throw new BadCredentialsException();
    }
    return this.getTokens(stored.credential);
  }
}
