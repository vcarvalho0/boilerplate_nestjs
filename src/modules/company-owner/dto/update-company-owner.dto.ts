import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyOwnerDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva', required: false })
  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ description: 'Email do usuário', example: 'joao@email.com', required: false })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Senha do usuário', example: 'senhaSegura123', required: false })
  password?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'CPF ou CNPJ do usuário', example: '12345678901', required: false })
  document?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Telefone do usuário', example: '+5511999998888', required: false })
  phone?: string;
}
