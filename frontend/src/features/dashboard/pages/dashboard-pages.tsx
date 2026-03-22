import { useMemo, useState } from "react";
import { AppShell } from "../../../components/layout/app-shell";
import { Input } from "../../../components/ui/input";
import { Spinner } from "../../../components/ui/spinner";
import { PropertyCard } from "../../properties/components/property-card";
import { useAuth } from "../../../hooks/use-auth";
import { useProperties } from "../../properties/hooks/use-properties";
import { useFavourites } from "../../favourites/hooks/use-favourites";
import { useAddFavourite, useRemoveFavourite } from "../../favourites/hooks/use-favourite-mutations";
import { PaginationControls } from "../../../components/ui/pagination-control";
import { FavouritesList } from "../../favourites/components/favourites-list";

export const DashboardPage = () => {
    const { user } = useAuth();

    const [propertyPage, setPropertyPage] = useState(1);
    const [favouritesPage, setFavouritesPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<"createdAt" | "price" | "title">("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const propertiesQuery = useProperties({
        page: propertyPage,
        limit: 6,
        sortBy,
        sortOrder,
        search: search.trim() || undefined,
    });

    const favouritesQuery = useFavourites({
        page: favouritesPage,
        limit: 5,
        sortOrder: "desc",
    });

    const addFavouriteMutation = useAddFavourite();
    const removeFavouriteMutation = useRemoveFavourite();

    const favouritePropertyIds = useMemo(() => {
        return new Set(
            (favouritesQuery.data?.data ?? []).map((favourite) => favourite.propertyId)
        );
    }, [favouritesQuery.data]);

    const handleToggleFavourite = async (
        propertyId: string,
        isFavourite: boolean
    ) => {
        if (isFavourite) {
            await removeFavouriteMutation.mutateAsync(propertyId);
            return;
        }

        await addFavouriteMutation.mutateAsync(propertyId);
    };

    const propertyMeta = propertiesQuery.data?.meta;
    const favouritesMeta = favouritesQuery.data?.meta;

    return (
        <AppShell title="Buyer Dashboard">
            <div className="space-y-8">
                <section className="rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Welcome{user ? `, ${user.name}` : ""}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Browse available properties and like the ones you want to keep track of.
                    </p>
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
                                    setPropertyPage(1);
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
                                    setPropertyPage(1);
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
                                    setPropertyPage(1);
                                }}
                            >
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-4 text-xl font-semibold text-gray-900">
                            Available Properties
                        </h2>

                        {propertiesQuery.isLoading ? (
                            <div className="flex justify-center py-12">
                                <Spinner />
                            </div>
                        ) : propertiesQuery.isError ? (
                            <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                                Failed to load properties.
                            </div>
                        ) : (propertiesQuery.data?.data ?? []).length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-600">
                                No properties found.
                            </div>
                        ) : (
                            <>
                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {(propertiesQuery.data?.data ?? []).map((property) => {
                                        const isFavourite = favouritePropertyIds.has(property.id);
                                        const mutationLoading =
                                            addFavouriteMutation.isPending ||
                                            removeFavouriteMutation.isPending;

                                        return (
                                            <PropertyCard
                                                key={property.id}
                                                property={property}
                                                isFavourite={isFavourite}
                                                isLoading={mutationLoading}
                                                onToggleFavourite={handleToggleFavourite}
                                            />
                                        );
                                    })}
                                </div>

                                <PaginationControls
                                    page={propertyPage}
                                    totalPages={propertyMeta?.totalPages ?? 1}
                                    onPrevious={() => setPropertyPage((prev) => Math.max(prev - 1, 1))}
                                    onNext={() =>
                                        setPropertyPage((prev) =>
                                            Math.min(prev + 1, propertyMeta?.totalPages ?? 1)
                                        )
                                    }
                                />
                            </>
                        )}
                    </div>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">
                        My Favourites
                    </h2>

                    {favouritesQuery.isLoading ? (
                        <div className="flex justify-center py-8">
                            <Spinner />
                        </div>
                    ) : favouritesQuery.isError ? (
                        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                            Failed to load favourites.
                        </div>
                    ) : (
                        <>
                            <FavouritesList
                                favourites={favouritesQuery.data?.data ?? []}
                                isLoading={removeFavouriteMutation.isPending}
                                onToggleFavourite={handleToggleFavourite}
                            />

                            <PaginationControls
                                page={favouritesPage}
                                totalPages={favouritesMeta?.totalPages ?? 1}
                                onPrevious={() =>
                                    setFavouritesPage((prev) => Math.max(prev - 1, 1))
                                }
                                onNext={() =>
                                    setFavouritesPage((prev) =>
                                        Math.min(prev + 1, favouritesMeta?.totalPages ?? 1)
                                    )
                                }
                            />
                        </>
                    )}
                </section>
            </div>
        </AppShell>
    );
};