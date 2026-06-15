import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isNil } from 'lodash';
import { CredentialEntity } from '../data/entity/credential.entity';
import { SignInPayload } from '../data/payload/sign-in.payload';
import { SignUpPayload } from '../data/payload/sign-up.payload';
import { UserNotFoundException } from '../data/exception/user-not-found.exception';
import { BadCredentialsException } from '../data/exception/bad-credentials.exception';
import { TokenService } from './token.service';
import { comparePassword, encryptPassword } from '../utils/password.utils';

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(CredentialEntity)
    private credentialRepository: Repository<CredentialEntity>,
    private tokenService: TokenService,
  ) {}

  async signUp(payload: SignUpPayload) {
    const credential = new CredentialEntity();
    credential.username = payload.username;
    credential.mail = payload.mail;
    credential.password = await encryptPassword(payload.password);
    const saved = await this.credentialRepository.save(credential);
    const { password, ...rest } = saved;
    return rest;
  }

  async signIn(payload: SignInPayload) {
    const credential = await this.credentialRepository.findOneBy({
      username: payload.username,
    });
    if (isNil(credential)) {
      throw new UserNotFoundException();
    }
    if (!(await comparePassword(payload.password, credential.password))) {
      throw new BadCredentialsException();
    }
    const tokens = await this.tokenService.getTokens(credential);
    const { password, ...cred } = tokens!.credential;
    return {
      token: tokens!.token,
      refreshToken: tokens!.refreshToken,
      credential: cred,
    };
  }

  async detail(id: string) {
    const credential = await this.credentialRepository.findOneBy({
      credential_id: id,
    });
    if (isNil(credential)) {
      throw new UserNotFoundException();
    }
    const { password, ...rest } = credential;
    return rest;
  }
}
