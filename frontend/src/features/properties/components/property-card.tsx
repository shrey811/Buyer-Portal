import type { Property } from "../types";

type PropertyCardProps = {
    property: Property;
    isFavourite: boolean;
    onToggleFavourite: (propertyId: string, isFavourite: boolean) => void;
    isLoading?: boolean;
};

export const PropertyCard = ({
    property,
    isFavourite,
    onToggleFavourite,
    isLoading = false,
}: PropertyCardProps) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{property.address}</p>
                    <p className="mt-3 text-sm font-medium text-gray-900">
                        NPR {property.price.toLocaleString()}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => onToggleFavourite(property.id, isFavourite)}
                    disabled={isLoading}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg transition ${isFavourite
                            ? "border-red-200 bg-red-50 text-red-600"
                            : "border-gray-300 bg-white text-gray-500 hover:border-red-200 hover:text-red-500"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                    aria-label={isFavourite ? "Unlike property" : "Like property"}
                    title={isFavourite ? "Unlike" : "Like"}
                >
                    {isFavourite ? "♥" : "♡"}
                </button>
            </div>
        </div>
    );
};