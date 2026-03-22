import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "../src/generated/prisma/client";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("Missing DATABASE_URL");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    const email = process.env.SEED_SUPERADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.SEED_SUPERADMIN_PASSWORD;
    const name = process.env.SEED_SUPERADMIN_NAME;

    if (!email || !password || !name) {
        console.log("Skipping super admin seed (env not provided)");
        return;
    }

    const existing = await prisma.user.findUnique({
        where: { email },
    });

    if (!existing) {
        const passwordHash = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name: name.trim(),
                email,
                passwordHash,
                role: UserRole.SUPER_ADMIN,
            },
        });

        console.log("Super admin created");
    } else {
        console.log("Super admin already exists");
    }
}

main()
    .catch((e) => {
        console.error("Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });