import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUser {
  @ApiProperty({ example: 'Henrique', description: 'nome do usuario' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'henriqueda12@lua.com',
    description: 'email do usuario',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'henriquedelas', description: 'a senha do usuario' })
  @IsNotEmpty()
  @MinLength(8)
  hash: string;

  @ApiProperty({
    example: 'user',
    description:
      'O papel do usuario no sistema, sendo 3 possibilidades, user, admin, moderator',
  })
  @IsNotEmpty()
  role: string;
}

export class SelectUser {
  name: string;
  email: string;
}

export class LoginUser {
  @ApiProperty({
    example: 'henriqueda12@lua.com',
    description: 'email do usuario',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'henriquedelas', description: 'a senha do usuario' })
  hash: string;
}

export class Payload {
  sub: string;
  email: string;
  role: string;
}

export class AccessToken {
  access_token: string;
}
