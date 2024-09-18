import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUser } from 'src/domain/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() { email, hash }: LoginUser) {
    return await this.authService.login({ email, hash });
  }
}
