
import { prisma } from "../../config/db";
import { ApiError } from "../../utils/apiError";
import { comparePassword, hashPassword } from "../../utils/password";
import { signToken } from "../../utils/jwt";
import { normalizeEmail } from "../../utils/normalize";
import { UserRole } from "../../generated/prisma/client";
import { Prisma } from "../../generated/prisma/client";

type RegisterInput = {
    name: string;
    email: string;
    password: string;
};

type LoginInput = {
    email: string;
    password: string;
};

export const registerUser = async ({ name, email, password }: RegisterInput) => {
    const normalizedEmail = normalizeEmail(email);
    const passwordHash = await hashPassword(password);

    try {
        const user = await prisma.user.create({
            data: {
                name: name.trim(),
                email: normalizedEmail,
                passwordHash,
                role: UserRole.BUYER,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        const token = signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            token,
            user,
        };
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            throw new ApiError(409, "Email is already registered");
        }

        throw error;
    }
};

export const loginUser = async ({ email, password }: LoginInput) => {
    const normalizedEmail = normalizeEmail(email);

    const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
    });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = signToken({
        userId: user.id,
        email: user.email,
        role: user.role,
    });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
    };
};

export const getCurrentUser = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};