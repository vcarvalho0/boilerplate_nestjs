import { PrismaService } from '@database/PrismaService';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { Company, User } from '@prisma/client';
import { UpdateCompanyDTO } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: Partial<User>, payload: CreateCompanyDTO): Promise<Company> {
    const existingCompany = await this.prisma.company.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (existingCompany) {
      throw new ConflictException('Este usuário já possui uma empresa cadastrada.');
    }

    const userExists = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado para vincular à empresa.');
    }

    return this.prisma.company.create({
      data: {
        ...payload,
        userId: user.id,
      },
    });
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.prisma.company.findMany({
      include: {
        companyOwner: true,
      },
    });

    return companies.map((company) => {
      if (company.companyOwner) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...safeOwner } = company.companyOwner;
        return {
          ...company,
          companyOwner: safeOwner,
        };
      }

      return company;
    });
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: {
        id,
      },
      include: {
        companyOwner: true,
        products: true,
      },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...ownerWithoutPassword } = company.companyOwner || {};

    return {
      ...company,
      companyOwner: ownerWithoutPassword,
    };
  }

  async update(user: Partial<User>, payload: UpdateCompanyDTO): Promise<Company> {
    return this.prisma.company.update({
      where: {
        userId: user.id,
      },
      data: payload,
    });
  }

  async remove(user: Partial<User>): Promise<Company> {
    return this.prisma.company.delete({
      where: {
        userId: user.id,
      },
    });
  }
}
