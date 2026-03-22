export const schemas = {
    RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", format: "email", example: "example@example.com" },
            password: { type: "string", example: "Password123" },
        },
    },

    LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: { type: "string", format: "email", example: "example@example.com" },
            password: { type: "string", example: "Password123" },
        },
    },

    AuthUser: {
        type: "object",
        properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
        },
    },

    AuthResponse: {
        type: "object",
        properties: {
            success: { type: "boolean" },
            message: { type: "string" },
            data: {
                type: "object",
                properties: {
                    token: { type: "string" },
                    user: { $ref: "#/components/schemas/AuthUser" },
                },
            },
        },
    },

    ErrorResponse: {
        type: "object",
        properties: {
            success: { type: "boolean" },
            message: { type: "string" },
            details: { nullable: true },
        },
    },
};