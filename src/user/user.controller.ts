import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from 'src/domain/user/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'cria um usuario' })
  @ApiResponse({ status: 401 })
  @HttpCode(201)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Moderator)
  @Post()
  async createUser(@Body() user: CreateUser) {
    return await this.userService.createUser(user);
  }
}
