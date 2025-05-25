import { PrismaClient, Role } from '@prisma/client';

export async function seedCompany(prisma: PrismaClient) {
  const user = await prisma.user.findFirst({
    where: {
      role: Role.CompanyOwner,
    },
  });

  await prisma.company.createMany({
    data: [
      {
        name: 'Tech Solutions Ltda',
        cnpj: '12345678000199',
        address: 'Rua das Flores, 123, Centro, São Paulo - SP',
        userId: user.id,
      },
    ],
  });

  console.log('Company seed added successfully 🌱.');
}
