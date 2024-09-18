import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUser } from 'src/domain/user/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'faz o login' })
  @Post()
  async login(@Body() { email, hash }: LoginUser) {
    return await this.authService.login({ email, hash });
  }
}
