import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Credential } from '../entities';
import { SignInPayload, SignupPayload } from '../model';
import { comparePassword, encryptPassword } from '../security.crypt';

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(payload: SignupPayload): Promise<Partial<Credential>> {
    const credential = new Credential();
    credential.username = payload.username;
    credential.mail = payload.mail;
    credential.password = await encryptPassword(payload.password);
    const { password, ...saved } = await this.credentialRepository.save(credential);
    return saved;
  }

  async signIn(payload: SignInPayload) {
    const credential = await this.credentialRepository.findOneBy({
      username: payload.username,
    });
    if (
      !credential ||
      !(await comparePassword(payload.password, credential.password))
    ) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const token = await this.jwtService.signAsync({
      sub: credential.credential_id,
      username: credential.username,
    });
    const { password, ...result } = credential;
    return { token, credential: result };
  }

  async detail(id: string): Promise<Partial<Credential>> {
    const credential = await this.credentialRepository.findOneBy({
      credential_id: id,
    });
    if (!credential) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = credential;
    return result;
  }
}
