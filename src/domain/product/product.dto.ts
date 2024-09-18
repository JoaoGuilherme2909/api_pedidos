import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateProduct {
  @ApiProperty({
    example: 'pizza 4 queijos',
    description: 'nome do produto',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '24,90',
    description: 'valor do produto',
  })
  @IsNotEmpty()
  @IsDecimal()
  value: number;
}

export class UpdateProduct {
  @ApiProperty({})
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: 'pizza 4 queijos',
    description: 'nome do produto',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '24,90',
    description: 'valor do produto',
  })
  @IsNotEmpty()
  @IsDecimal()
  value: number;
}

export interface product {
  name: string;
  value: string;
}
