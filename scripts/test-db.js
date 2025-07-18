// scripts/test-db.js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  console.log('Users:', users)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
