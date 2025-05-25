import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @ApiProperty({ description: 'Nome do produto', example: 'Teclado' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Descrição do produto' })
  description: string;

  @IsNumber()
  @ApiProperty({ description: 'Preço do produto' })
  price: number;
}
