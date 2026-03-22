import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
function getOptionalEnv(name: string): string | undefined {
    return process.env[name];
}
function getNumberEnv(name: string, fallback: number): number {
    const value = process.env[name];
    if (!value) return fallback;

    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
        throw new Error(`Environment variable ${name} must be a number`);
    }

    return parsed;
}

export const env = {
    port: getNumberEnv("PORT", 5000),
    databaseUrl: getEnv("DATABASE_URL"),
    jwtSecret: getEnv("JWT_SECRET"),
    jwtExpiresIn: getEnv("JWT_EXPIRES_IN"),
    nodeEnv: process.env.NODE_ENV || "development",
    seedSuperadminName: getOptionalEnv("SEED_SUPERADMIN_NAME"),
    seedSuperadminEmail: getOptionalEnv("SEED_SUPERADMIN_EMAIL"),
    seedSuperadminPassword: getOptionalEnv("SEED_SUPERADMIN_PASSWORD"),
};