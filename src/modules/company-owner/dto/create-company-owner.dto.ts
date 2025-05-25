import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyOwnerDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
  name: string;

  @IsEmail()
  @ApiProperty({ description: 'Email do usuário', example: 'joao@email.com' })
  email: string;

  @IsString()
  @Length(6, 20)
  @ApiProperty({ description: 'Senha do usuário', example: 'senhaSegura123' })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'CPF ou CNPJ do usuário', example: '12345678901', required: false })
  document?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Telefone do usuário', example: '+5511999998888', required: false })
  phone?: string;
}
