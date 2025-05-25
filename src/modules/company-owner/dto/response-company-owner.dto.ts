import { ApiProperty } from '@nestjs/swagger';
import { Role, Status } from '@prisma/client';

export class CompanyOwnerResponseDTO {
  @ApiProperty({ description: 'ID do usuário', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
  name: string;

  @ApiProperty({ description: 'Email do usuário', example: 'joao@email.com' })
  email: string;

  @ApiProperty({
    description: 'Documento do usuário (CPF ou CNPJ)',
    example: '12345678901',
    required: false,
  })
  document?: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+5511999998888',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    description: 'URL do arquivo enviado pelo usuário (opcional)',
    example: 'https://bucket.s3.amazonaws.com/file.jpg',
    required: false,
  })
  fileUrl?: string;

  @ApiProperty({
    description: 'Chave do arquivo no armazenamento (opcional)',
    example: 'file.jpg',
    required: false,
  })
  fileKey?: string;

  @ApiProperty({
    enum: Role,
    description: 'Papel do usuário no sistema',
    example: Role.CompanyOwner,
  })
  role: Role;

  @ApiProperty({
    enum: Status,
    description: 'Status da conta do usuário',
    example: Status.Pending,
  })
  status: Status;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2024-01-01T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do usuário',
    example: '2024-01-05T15:45:00Z',
  })
  updatedAt: Date;
}
