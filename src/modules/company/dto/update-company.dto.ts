import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'Nome da empresa', example: 'Tech Solutions Ltda', required: false })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'CNPJ da empresa', example: '12345678000199', required: false })
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Endereço completo da empresa',
    example: 'Rua das Flores, 123, Centro, São Paulo - SP',
    required: false,
  })
  address: string;
}
