import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/apiError";
import { getCurrentUser, loginUser, registerUser } from "./auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const result = await registerUser({ name, email, password });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
    });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await loginUser({ email, password });

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
    });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized");
    }

    const user = await getCurrentUser(req.user.userId);

    res.status(200).json({
        success: true,
        message: "Current user fetched successfully",
        data: user,
    });
});