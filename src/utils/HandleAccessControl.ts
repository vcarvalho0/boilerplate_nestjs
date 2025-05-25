import { PrismaService } from '@database/PrismaService';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Role, User } from '@prisma/client';

class HandleAccessControl {
  constructor(private readonly prisma: PrismaService) {}

  async verifyProductOwnership(userPayload: Partial<User>, productId: number): Promise<void> {
    await this.verifyCompanyOwnership(userPayload);

    const company = await this.prisma.company.findUnique({
      where: {
        userId: userPayload.id,
      },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    const products = await this.prisma.product.findUnique({
      where: {
        companyId: company.id,
        id: productId,
      },
    });

    if (!products) {
      throw new NotFoundException('Produto não encontrado ou não pertence a empresa');
    }
  }

  async verifyCompanyOwnership(payload: Partial<User>): Promise<void> {
    const { role, id } = payload;

    if (role !== Role.CompanyOwner) {
      throw new ForbiddenException('Acesso não autorizado.');
    }

    const owner = await this.prisma.user.findUnique({
      where: {
        id,
        company: {
          userId: id,
        },
      },
      include: {
        company: true,
      },
    });

    if (!owner) {
      throw new NotFoundException('Owner não encontrado!');
    }
  }

  verifyAdminRole(payload: Partial<User>): void {
    const { role } = payload;

    if (role !== Role.Master && role !== Role.Admin) {
      throw new ForbiddenException('Acesso não autorizado.');
    }
  }

  async verifyPermission(payload: Partial<User>, permission: string): Promise<void> {
    const { id } = payload;

    const user = await this.prisma.user.findFirst({
      where: { id },
      include: { adminPermissions: true },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const validPermission: boolean = user.adminPermissions.some(({ name }) => name === permission);

    if (!validPermission) throw new ForbiddenException('Acesso não autorizado.');
  }
}

export default new HandleAccessControl(new PrismaService());
