const { PrismaClient } = require("@prisma/client");

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

const globalForPrisma = global;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

exports.prisma = globalForPrisma.prisma;
