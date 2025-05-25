import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './admin.seeds';
import { seedUser } from './user.seeds';
import { seedText } from './text.seeds';
import { seedCompanyOwner } from './company-owner.seed';
import { seedCompany } from './company.seed';
import { seedProduct } from './product.seed';

const prisma = new PrismaClient();

async function main() {
  await seedAdmin(prisma);
  await seedUser(prisma);
  await seedText(prisma);
  await seedCompanyOwner(prisma);
  await seedCompany(prisma);
  await seedProduct(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
