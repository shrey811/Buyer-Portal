import rateLimit from "express-rate-limit";
import { APP_LIMITS } from "../config/constants";

export const authRateLimiter = rateLimit({
    windowMs: APP_LIMITS.AUTH_WINDOW_MS,
    max: APP_LIMITS.AUTH_MAX_REQUESTS,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many auth attempts, please try again later.",
        details: null,
    },
});