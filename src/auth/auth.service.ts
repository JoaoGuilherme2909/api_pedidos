import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessToken, LoginUser, Payload } from 'src/domain/user/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login({ email, hash }: LoginUser): Promise<AccessToken> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    const isPasswordCorrect = await argon2.verify(user.hash, hash);

    if (isPasswordCorrect) {
      const payload: Payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new UnauthorizedException();
  }
}
