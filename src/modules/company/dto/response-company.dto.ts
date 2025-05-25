import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ example: 4 })
  id: number;

  @ApiProperty({ example: 'José3' })
  name: string;

  @ApiProperty({ example: 'jose3@email.com' })
  email: string;

  @ApiProperty({ example: '16800123349121' })
  document: string;

  @ApiProperty({ example: '0103221343254121' })
  phone: string;

  @ApiProperty({ example: null, nullable: true })
  code: string | null;

  @ApiProperty({ example: null, nullable: true })
  codeExpiresIn: Date | null;

  @ApiProperty({ example: 'CompanyOwner' })
  role: string;

  @ApiProperty({ example: 'Active' })
  status: string;

  @ApiProperty({ example: null, nullable: true })
  fileUrl: string | null;

  @ApiProperty({ example: null, nullable: true })
  fileKey: string | null;

  @ApiProperty({ example: '2025-05-25T21:00:38.809Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-05-25T21:00:38.809Z' })
  updatedAt: Date;
}

export class ProductDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Produto Teste' })
  name: string;

  @ApiProperty({ example: 99.99 })
  price: number;

  @ApiProperty({ example: 'Descrição do produto teste.' })
  description: string;

  @ApiProperty({ example: '2025-05-25T21:10:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-05-25T21:10:00.000Z' })
  updatedAt: Date;
}

export class CompanyOwnerDTO {
  @ApiProperty({ example: 2 })
  id: number;

  @ApiProperty({ example: 'Teste' })
  name: string;

  @ApiProperty({ example: '12345678000199' })
  cnpj: string;

  @ApiProperty({ example: 'Rua das Flores, 123, Centro, São Paulo - SP' })
  address: string;

  @ApiProperty({ example: 4 })
  userId: number;

  @ApiProperty({ example: '2025-05-25T21:13:18.288Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-05-25T21:13:18.288Z' })
  updatedAt: Date;

  @ApiProperty({ type: () => UserDTO })
  user: UserDTO;

  @ApiProperty({ type: () => [ProductDTO] })
  products: ProductDTO[];
}
