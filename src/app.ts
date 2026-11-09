import { startServer } from "./server/start-server.ts";

try {
  await startServer();
  console.log("Server started successfully.");
} catch (error) {
  console.error("Error starting server:", error);
}
