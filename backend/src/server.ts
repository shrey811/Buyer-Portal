import app from "./app";
import { env } from "./config/env";
import { prisma } from "./config/db";

const server = app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port}`);
});

const shutdown = async () => {
    console.log("Shutting down server...");
    server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
    });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);