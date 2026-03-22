import { Button } from "./button";

type PaginationControlsProps = {
    page: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
};

export const PaginationControls = ({
    page,
    totalPages,
    onPrevious,
    onNext,
}: PaginationControlsProps) => {
    return (
        <div className="mt-4 flex items-center justify-between">
            <Button type="button" onClick={onPrevious} disabled={page <= 1}>
                Previous
            </Button>

            <span className="text-sm text-gray-600">
                Page {page} of {totalPages || 1}
            </span>

            <Button
                type="button"
                onClick={onNext}
                disabled={page >= (totalPages || 1)}
            >
                Next
            </Button>
        </div>
    );
};