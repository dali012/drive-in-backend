import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

const prisma = new PrismaClient();

export async function connectToDB() {
  try {
    await prisma.$connect();
    logger.info("Connected To PlanetScale DB (MySQL)");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

export async function disconnectFromDB() {
  await prisma.$disconnect();
  logger.warn("Disconnected from DB PlanetScale DB (MySQL)");
}
