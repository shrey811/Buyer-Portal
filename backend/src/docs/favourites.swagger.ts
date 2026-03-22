export const favouritePaths = {
    "/api/favourites": {
        get: {
            tags: ["Favourites"],
            summary: "Get current user's favourites",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "page",
                    in: "query",
                    schema: { type: "integer", default: 1 },
                },
                {
                    name: "limit",
                    in: "query",
                    schema: { type: "integer", default: 10 },
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
            ],
            responses: {
                200: {
                    description: "Favourites fetched successfully",
                },
                401: {
                    description: "Unauthorized",
                },
            },
        },
    },

    "/api/favourites/{propertyId}": {
        post: {
            tags: ["Favourites"],
            summary: "Add property to favourites",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "propertyId",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid",
                    },
                },
            ],
            responses: {
                201: {
                    description: "Property added to favourites",
                },
                404: {
                    description: "Property not found",
                },
                409: {
                    description: "Property is already in favourites",
                },
            },
        },

        delete: {
            tags: ["Favourites"],
            summary: "Remove property from favourites",
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: "propertyId",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Property removed from favourites",
                },
                404: {
                    description: "Favourite not found",
                },
            },
        },
    },
};