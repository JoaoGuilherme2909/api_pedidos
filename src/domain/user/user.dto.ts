import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUser {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  hash: string;
  @IsNotEmpty()
  role: string;
}

export class SelectUser {
  name: string;
  email: string;
}

export class LoginUser {
  @IsNotEmpty()
  @IsEmail()
  email: string;
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
