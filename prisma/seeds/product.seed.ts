import { PrismaClient } from '@prisma/client';

export async function seedProduct(prisma: PrismaClient) {
  const company = await prisma.company.findFirst();

  await prisma.product.createMany({
    data: [
      {
        name: 'Teclado',
        description: 'Teclado para computador',
        price: '100',
        companyId: company.id,
      },
    ],
  });

  console.log('Product seed added successfully 🌱.');
}
