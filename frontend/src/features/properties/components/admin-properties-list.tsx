import { Button } from "../../../components/ui/button";
import type { Property } from "../types";

type AdminPropertiesListProps = {
    properties: Property[];
    editingPropertyId?: string | null;
    deletingPropertyId?: string | null;
    onEdit: (property: Property) => void;
    onDelete: (property: Property) => void;
};

export const AdminPropertiesList = ({
    properties,
    editingPropertyId,
    deletingPropertyId,
    onEdit,
    onDelete,
}: AdminPropertiesListProps) => {
    if (properties.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-600">
                No properties found.
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr className="text-left text-sm text-gray-600">
                            <th className="px-4 py-3 font-medium">Title</th>
                            <th className="px-4 py-3 font-medium">Address</th>
                            <th className="px-4 py-3 font-medium">Price</th>
                            <th className="px-4 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {properties.map((property) => (
                            <tr key={property.id} className="border-t border-gray-100">
                                <td className="px-4 py-3 text-sm text-gray-900">
                                    {property.title}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {property.address}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    NPR {property.price.toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            className="bg-gray-700 hover:bg-gray-600"
                                            onClick={() => onEdit(property)}
                                            disabled={editingPropertyId === property.id}
                                        >
                                            {editingPropertyId === property.id ? "Editing..." : "Edit"}
                                        </Button>

                                        <Button
                                            type="button"
                                            className="bg-red-600 hover:bg-red-500"
                                            onClick={() => onDelete(property)}
                                            disabled={deletingPropertyId === property.id}
                                        >
                                            {deletingPropertyId === property.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};