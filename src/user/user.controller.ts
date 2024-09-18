import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from 'src/domain/user/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUser) {
    return await this.userService.createUser(user);
  }
}
