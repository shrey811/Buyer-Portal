import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import { validate } from "../../middleware/validate.middleware";
import {
    createPropertyHandler,
    deletePropertyHandler,
    getProperties,
    updatePropertyHandler,
} from "./properties.controller";
import {
    createPropertySchema,
    getPropertiesQuerySchema,
    propertyIdParamSchema,
    updatePropertySchema,
} from "./properties.validation";
import { UserRole } from "../../generated/prisma/client";

const router = Router();

router.get("/", validate(getPropertiesQuerySchema), getProperties);

router.post(
    "/",
    authenticate,
    authorize(UserRole.SUPER_ADMIN),
    validate(createPropertySchema),
    createPropertyHandler
);

router.patch(
    "/:propertyId",
    authenticate,
    authorize(UserRole.SUPER_ADMIN),
    validate(updatePropertySchema),
    updatePropertyHandler
);

router.delete(
    "/:propertyId",
    authenticate,
    authorize(UserRole.SUPER_ADMIN),
    validate(propertyIdParamSchema),
    deletePropertyHandler
);

export default router;