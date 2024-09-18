import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { CreateUser, SelectUser } from 'src/domain/user/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser({ email, name, hash }: CreateUser): Promise<SelectUser> {
    const cryptHash = await argon.hash(hash);
    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        hash: cryptHash,
      },
    });
    return {
      name: user.name,
      email: user.email,
    };
  }
}
