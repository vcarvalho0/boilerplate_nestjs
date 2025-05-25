import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Nome do produto', example: 'Teclado', required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Descrição do produto', required: false })
  description?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Preço do produto', required: false })
  price?: number;
}
