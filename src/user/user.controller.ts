import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from 'src/domain/user/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Moderator)
  @Post()
  async createUser(@Body() user: CreateUser) {
    return await this.userService.createUser(user);
  }
}
