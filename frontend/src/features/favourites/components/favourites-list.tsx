import type { Favourite } from "../types";

type FavouritesListProps = {
    favourites: Favourite[];
};

export const FavouritesList = ({ favourites }: FavouritesListProps) => {
    if (favourites.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-600">
                You have not added any favourites yet.
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {favourites.map((favourite) => (
                <div
                    key={favourite.id}
                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                    <h3 className="text-base font-semibold text-gray-900">
                        {favourite.property.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                        {favourite.property.address}
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-900">
                        NPR {favourite.property.price.toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
};