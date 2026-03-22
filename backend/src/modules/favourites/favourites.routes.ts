import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import {
    createFavourite,
    deleteFavourite,
    getFavourites,
} from "./favourites.controller";
import {
    getFavouritesQuerySchema,
    propertyIdParamSchema,
} from "./favourites.validation";

const router = Router();

router.use(authenticate);

router.get("/", validate(getFavouritesQuerySchema), getFavourites);
router.post("/:propertyId", validate(propertyIdParamSchema), createFavourite);
router.delete("/:propertyId", validate(propertyIdParamSchema), deleteFavourite);

export default router;