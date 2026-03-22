import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import type { Property } from "../types";
import {
    propertyFormSchema,
    type PropertyFormValues,
} from "../schemas/property.schema";

type PropertyFormProps = {
    initialValues?: Property | null;
    onSubmit: (values: PropertyFormValues) => Promise<void>;
    isSubmitting?: boolean;
    submitLabel: string;
    onCancel?: () => void;
};

export const PropertyForm = ({
    initialValues,
    onSubmit,
    isSubmitting = false,
    submitLabel,
    onCancel,
}: PropertyFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PropertyFormValues>({
        resolver: zodResolver(propertyFormSchema),
        defaultValues: {
            title: initialValues?.title ?? "",
            address: initialValues?.address ?? "",
            price: initialValues?.price ?? 0,
        },
    });

    useEffect(() => {
        reset({
            title: initialValues?.title ?? "",
            address: initialValues?.address ?? "",
            price: initialValues?.price ?? 0,
        });
    }, [initialValues, reset]);

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Title
                </label>
                <Input placeholder="Property title" {...register("title")} />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Address
                </label>
                <Input placeholder="Property address" {...register("address")} />
                {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Price
                </label>
                <Input
                    type="number"
                    min={1}
                    placeholder="Property price"
                    {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
            </div>

            <div className="flex gap-3">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : submitLabel}
                </Button>

                {onCancel && (
                    <Button
                        type="button"
                        className="bg-gray-200 text-gray-900 hover:bg-gray-300"
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
};