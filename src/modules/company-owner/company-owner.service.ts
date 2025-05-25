import { PrismaService } from '@database/PrismaService';
import { Injectable } from '@nestjs/common';
import { CreateCompanyOwnerDTO } from './dto/create-company-owner.dto';
import { Role, Status, User } from '@prisma/client';
import { UpdateCompanyOwnerDTO } from './dto/update-company-owner.dto';
import { checkExistingUser } from '@utils/checkExistingUser';
import { hashSync } from 'bcrypt';

@Injectable()
export class CompanyOwnerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateCompanyOwnerDTO): Promise<User> {
    await checkExistingUser(payload);

    return this.prisma.user.create({
      data: {
        ...payload,
        password: hashSync(payload.password, 10),
        role: Role.CompanyOwner,
        status: Status.Active,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        role: Role.CompanyOwner,
      },
    });
  }

  async update(user: Partial<User>, payload: UpdateCompanyOwnerDTO): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...payload,
        ...(payload.password && { password: hashSync(payload.password, 10) }),
      },
    });
  }

  async remove(user: Partial<User>): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}
