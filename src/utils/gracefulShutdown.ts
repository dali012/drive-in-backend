import { createServer } from "./createServer";
import { disconnectFromDB } from "./db";
import { logger } from "./logger";

export const signals = ["SIGINT", "SIGTERM", "SIGHUP"] as const;

interface GracefulShutdownParams {
  signal: typeof signals[number];
  server: Awaited<ReturnType<typeof createServer>>;
}

export async function gracefulShutdown({
  signal,
  server,
}: GracefulShutdownParams) {
  logger.info(`Got signal ${signal}. Good Bye`);
  await server.close();
  await disconnectFromDB();
  process.exit(0);
}
