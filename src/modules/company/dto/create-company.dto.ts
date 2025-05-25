import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome da empresa', example: 'Tech Solutions Ltda' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'CNPJ da empresa', example: '12345678000199' })
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Endereço completo da empresa',
    example: 'Rua das Flores, 123, Centro, São Paulo - SP',
  })
  address: string;
}
