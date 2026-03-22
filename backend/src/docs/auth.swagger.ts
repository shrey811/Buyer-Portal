export const authPaths = {
    "/api/auth/register": {
        post: {
            tags: ["Auth"],
            summary: "Register a new buyer",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/RegisterRequest" },
                    },
                },
            },
            responses: {
                201: {
                    description: "User registered successfully",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/AuthResponse" },
                        },
                    },
                },
                409: {
                    description: "Email already registered",
                },
            },
        },
    },

    "/api/auth/login": {
        post: {
            tags: ["Auth"],
            summary: "Login user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/LoginRequest" },
                    },
                },
            },
            responses: {
                200: {
                    description: "Login successful",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/AuthResponse" },
                        },
                    },
                },
                401: {
                    description: "Invalid credentials",
                },
            },
        },
    },

    "/api/auth/me": {
        get: {
            tags: ["Auth"],
            summary: "Get current user",
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: "Current user",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/AuthUser" },
                        },
                    },
                },
                401: {
                    description: "Unauthorized",
                },
            },
        },
    },
};