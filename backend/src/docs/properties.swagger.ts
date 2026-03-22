export const propertyPaths = {
    "/api/properties": {
        get: {
            tags: ["Properties"],
            summary: "Get all properties",
            parameters: [
                { name: "page", in: "query", schema: { type: "integer", default: 1 } },
                { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                {
                    name: "sortBy",
                    in: "query",
                    schema: {
                        type: "string",
                        enum: ["createdAt", "price", "title"],
                        default: "createdAt",
                    },
                },
                {
                    name: "sortOrder",
                    in: "query",
                    schema: {
                        type: "string",
                        enum: ["asc", "desc"],
                        default: "desc",
                    },
                },
                { name: "search", in: "query", schema: { type: "string" } },
            ],
            responses: {
                200: {
                    description: "Properties fetched successfully",
                },
            },
        },
        post: {
            tags: ["Properties"],
            summary: "Create property ",
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["title", "address", "price"],
                            properties: {
                                title: { type: "string", example: "Luxury Villa" },
                                address: { type: "string", example: "Pokhara" },
                                price: { type: "integer", example: 450000 },
                            },
                        },
                    },
                },
            },
            responses: {
                201: { description: "Property created successfully" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden" },
            },
        },
    },

    "/api/properties/{propertyId}": {
        patch: {
            tags: ["Properties"],
            summary: "Update property ",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "propertyId",
                    in: "path",
                    required: true,
                    schema: { type: "string", format: "uuid" },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string" },
                                address: { type: "string" },
                                price: { type: "integer" },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "Property updated successfully" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden" },
                404: { description: "Property not found" },
            },
        },

        delete: {
            tags: ["Properties"],
            summary: "Delete property",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "propertyId",
                    in: "path",
                    required: true,
                    schema: { type: "string", format: "uuid" },
                },
            ],
            responses: {
                200: { description: "Property deleted successfully" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden" },
                404: { description: "Property not found" },
            },
        },
    },
};