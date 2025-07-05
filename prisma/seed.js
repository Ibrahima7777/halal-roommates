// prisma/seed.js
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await hash('Test1234!', 10)
  await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      passwordHash
    }
  })
  console.log('✅ Seeded test user: test@example.com / Test1234!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
