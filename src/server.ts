import { config } from "./utils/config";
import { createServer } from "./utils/createServer";
import { connectToDB } from "./utils/db";
import { gracefulShutdown, signals } from "./utils/gracefulShutdown";
import { logger } from "./utils/logger";

async function startServer() {
  const server = await createServer();
  server.listen({
    port: config.PORT,
    host: config.HOST,
  });
  logger.info(`Server running`);
  await connectToDB();
  for (let index = 0; index < signals.length; index++) {
    process.on(signals[index], () => {
      gracefulShutdown({
        signal: signals[index],
        server,
      });
    });
  }
}

startServer();
