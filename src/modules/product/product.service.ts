import { PrismaService } from '@database/PrismaService';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product, Role, User } from '@prisma/client';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userPayload: Partial<User>, payload: CreateProductDTO): Promise<Product> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userPayload.id,
        role: Role.CompanyOwner,
      },
      include: {
        company: true,
      },
    });

    if (!user.company) {
      throw new NotFoundException('Usuario não possui uma empresa cadastrada');
    }

    return this.prisma.product.create({
      data: {
        ...payload,
        companyId: user.company.id,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: {
        company: true,
      },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: number, updateProduct: UpdateProductDTO): Promise<Product> {
    return this.prisma.product.update({
      where: {
        id,
      },
      data: updateProduct,
    });
  }

  async remove(id: number): Promise<Product> {
    await this.findOne(id);
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
