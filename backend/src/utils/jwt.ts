import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { UserRole } from "../generated/prisma/client";

export type JwtPayload = {
    userId: string;
    email: string;
    role: UserRole;
};

export const signToken = (payload: JwtPayload): string => {
    const secret: Secret = env.jwtSecret;

    const options: SignOptions = {
        expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
    };

    return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): JwtPayload => {
    const secret: Secret = env.jwtSecret;
    return jwt.verify(token, secret) as JwtPayload;
};