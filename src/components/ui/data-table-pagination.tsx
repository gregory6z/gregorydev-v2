import type { Dispatch, SetStateAction } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationFilters = {
  page: number;
  perPage: number;
};

type DataTablePaginationProps<T extends PaginationFilters> = {
  filters: T;
  setFilters: Dispatch<SetStateAction<T>>;
  totalPages: number;
  perPageOptions?: number[];
  perPageLabel?: string;
};

const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] => {
  const pages: (number | "ellipsis")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  if (currentPage > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("ellipsis");
  }

  pages.push(totalPages);

  return pages;
};

const DataTablePagination = <T extends PaginationFilters>({
  filters,
  setFilters,
  totalPages,
  perPageOptions = [15, 25, 50],
  perPageLabel = "per page",
}: DataTablePaginationProps<T>) => {
  const pageNumbers = generatePageNumbers(filters.page, totalPages);

  const handlePageChange = (page: number) => {
    setFilters((filters) => ({ ...filters, page }));
  };

  const handlePerPageChange = (perPage: number) => {
    setFilters((filters) => ({ ...filters, perPage, page: 1 }));
  };

  return (
    <div
      data-slot="data-table-pagination"
      className="flex items-center justify-between mt-4"
    >
      <div className="flex items-center gap-2">
        <Select
          value={String(filters.perPage)}
          onValueChange={(v) => handlePerPageChange(Number(v))}
        >
          <SelectTrigger className="w-14 h-8 text-sm border-none shadow-none px-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false} className="min-w-[60px]">
            {perPageOptions.map((option) => (
              <SelectItem
                key={option}
                value={String(option)}
                className="px-3 py-1.5 text-sm hover:font-semibold"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-disabled">{perPageLabel}</span>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(filters.page - 1)}
              aria-disabled={filters.page === 1}
              className={
                filters.page === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {pageNumbers.map((pageNum, index) =>
            pageNum === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => handlePageChange(pageNum)}
                  isActive={filters.page === pageNum}
                  className="cursor-pointer"
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(filters.page + 1)}
              aria-disabled={filters.page === totalPages}
              className={
                filters.page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export { DataTablePagination };
export type { PaginationFilters };
