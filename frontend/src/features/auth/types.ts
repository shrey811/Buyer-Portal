export type UserRole = "BUYER" | "SUPER_ADMIN";

export type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
};

export type AuthResponse = {
    token: string;
    user: AuthUser;
};