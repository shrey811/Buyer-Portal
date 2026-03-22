import { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { AppShell } from "../../../components/layout/app-shell";
import { Input } from "../../../components/ui/input";
import { Spinner } from "../../../components/ui/spinner";

import { useProperties } from "../hooks/use-properties";
import {
    useCreateProperty,
    useDeleteProperty,
    useUpdateProperty,
} from "../hooks/use-property-mutations";
import { PropertyForm } from "../components/property-form";
import { AdminPropertiesList } from "../components/admin-properties-list";
import type { Property } from "../types";
import type { ApiErrorResponse } from "../../../types/api";
import type { PropertyFormValues } from "../schemas/property.schema";
import { PaginationControls } from "../../../components/ui/pagination-control";

export const AdminPropertiesPage = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<"createdAt" | "price" | "title">("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const [deletingPropertyId, setDeletingPropertyId] = useState<string | null>(null);
    const [propertyPendingDelete, setPropertyPendingDelete] = useState<Property | null>(null);

    const propertiesQuery = useProperties({
        page,
        limit: 10,
        sortBy,
        sortOrder,
        search: search.trim() || undefined,
    });

    const createPropertyMutation = useCreateProperty();
    const updatePropertyMutation = useUpdateProperty();
    const deletePropertyMutation = useDeleteProperty();

    const mutationErrorMessage = useMemo(() => {
        const error =
            createPropertyMutation.error ||
            updatePropertyMutation.error ||
            deletePropertyMutation.error;

        if (error instanceof AxiosError) {
            return (error.response?.data as ApiErrorResponse | undefined)?.message;
        }

        return null;
    }, [
        createPropertyMutation.error,
        updatePropertyMutation.error,
        deletePropertyMutation.error,
    ]);

    const handleCreateProperty = async (values: PropertyFormValues) => {
        await createPropertyMutation.mutateAsync(values);
    };

    const handleUpdateProperty = async (values: PropertyFormValues) => {
        if (!editingProperty) return;

        await updatePropertyMutation.mutateAsync({
            propertyId: editingProperty.id,
            payload: values,
        });

        setEditingProperty(null);
    };

    const handleOpenDeleteModal = (property: Property) => {
        setPropertyPendingDelete(property);
    };

    const handleCloseDeleteModal = () => {
        if (deletePropertyMutation.isPending) return;
        setPropertyPendingDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!propertyPendingDelete) return;

        try {
            setDeletingPropertyId(propertyPendingDelete.id);
            await deletePropertyMutation.mutateAsync(propertyPendingDelete.id);

            if (editingProperty?.id === propertyPendingDelete.id) {
                setEditingProperty(null);
            }

            setPropertyPendingDelete(null);
        } finally {
            setDeletingPropertyId(null);
        }
    };

    const meta = propertiesQuery.data?.meta;

    return (
        <AppShell title="Property Management">
            <div className="space-y-8">
                <section className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Create Property
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Add a new property to the platform.
                        </p>

                        <div className="mt-5">
                            <PropertyForm
                                submitLabel="Create property"
                                onSubmit={handleCreateProperty}
                                isSubmitting={createPropertyMutation.isPending}
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {editingProperty ? "Edit Property" : "Select a Property"}
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            {editingProperty
                                ? "Update the selected property."
                                : "Choose a property from the list below to edit it."}
                        </p>

                        <div className="mt-5">
                            {editingProperty ? (
                                <PropertyForm
                                    initialValues={editingProperty}
                                    submitLabel="Update property"
                                    onSubmit={handleUpdateProperty}
                                    isSubmitting={updatePropertyMutation.isPending}
                                    onCancel={() => setEditingProperty(null)}
                                />
                            ) : (
                                <div className="rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-600">
                                    No property selected for editing.
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-end">
                        <div className="flex-1">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Search
                            </label>
                            <Input
                                placeholder="Search by title or address"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Sort by
                            </label>
                            <select
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value as "createdAt" | "price" | "title");
                                    setPage(1);
                                }}
                            >
                                <option value="createdAt">Newest</option>
                                <option value="price">Price</option>
                                <option value="title">Title</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Order
                            </label>
                            <select
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                                value={sortOrder}
                                onChange={(e) => {
                                    setSortOrder(e.target.value as "asc" | "desc");
                                    setPage(1);
                                }}
                            >
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>
                    </div>

                    {mutationErrorMessage && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {mutationErrorMessage}
                        </div>
                    )}

                    {propertiesQuery.isLoading ? (
                        <div className="flex justify-center py-12">
                            <Spinner />
                        </div>
                    ) : propertiesQuery.isError ? (
                        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                            Failed to load properties.
                        </div>
                    ) : (
                        <>
                            <AdminPropertiesList
                                properties={propertiesQuery.data?.data ?? []}
                                editingPropertyId={editingProperty?.id ?? null}
                                deletingPropertyId={deletingPropertyId}
                                onEdit={setEditingProperty}
                                onDelete={handleOpenDeleteModal}
                            />

                            <PaginationControls
                                page={page}
                                totalPages={meta?.totalPages ?? 1}
                                onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
                                onNext={() =>
                                    setPage((prev) => Math.min(prev + 1, meta?.totalPages ?? 1))
                                }
                            />
                        </>
                    )}
                </section>
            </div>

            {propertyPendingDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Delete property
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                            Are you sure you want to delete{" "}
                            <span className="font-medium text-gray-900">
                                {propertyPendingDelete.title}
                            </span>
                            ? This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleCloseDeleteModal}
                                disabled={deletePropertyMutation.isPending}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                disabled={deletePropertyMutation.isPending}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {deletePropertyMutation.isPending ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppShell>
    );
};