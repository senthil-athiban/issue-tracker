import { PrismaClient } from '@prisma/client'

/**
 * @description Initializes a single instance of `PrismaClient` and returns it on
 * each invocation, ensuring that only one client is created throughout the application's
 * execution.
 *
 * @returns {PrismaClient} An instance of a class representing a client to interact
 * with a database using the Prisma ORM system.
 */
const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma