import { z } from "zod";

export const propertyFormSchema = z.object({
    title: z.string().trim().min(2, "Title is required"),
    address: z.string().trim().min(2, "Address is required"),
    price: z
        .number({
            error: "Price is required",
        })
        .int("Price must be a whole number")
        .positive("Price must be greater than 0"),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;