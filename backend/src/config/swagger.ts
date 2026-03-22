import swaggerJsdoc from "swagger-jsdoc";
import { env } from "./env";
import { authPaths } from "../docs/auth.swagger";
import { favouritePaths } from "../docs/favourites.swagger";
import { propertyPaths } from "../docs/properties.swagger";
import { schemas } from "../docs/schemas.swagger";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Buyer Portal API",
            version: "1.0.0",
            description: "Auth and buyer favourites API",
        },
        servers: [
            {
                url: `http://localhost:${env.port}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas,
        },
        paths: {
            ...authPaths,
            ...propertyPaths,
            ...favouritePaths,
        },
    },
    apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);