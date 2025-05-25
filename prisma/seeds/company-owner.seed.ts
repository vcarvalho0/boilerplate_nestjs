import { PrismaClient, Role, Status } from '@prisma/client';
import { hashSync } from 'bcrypt';

export async function seedCompanyOwner(prisma: PrismaClient) {
  await prisma.user.createMany({
    data: [
      {
        name: 'company owner',
        email: 'user.company.owner@email.com',
        password: hashSync('12345678', 10),
        role: Role.CompanyOwner,
        status: Status.Active,
      },
    ],
  });

  console.log('Company owner seed added successfully 🌱.');
}
