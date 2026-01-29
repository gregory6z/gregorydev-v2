import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useFormatDate } from "@/hooks/use-format-date";
import { useOperations, useOperationsCounts } from "@/api/operations/queries";
import { useDeleteOperations } from "@/api/operations/mutations";
import type {
  OperationsListFilters,
  ConformityFilter,
  Operation,
} from "@/api/operations/schemas";

import { Button } from "@/components/ui/button";
import {
  DataTable,
  DataTableContent,
  DataTableHeader,
  DataTableBody,
  DataTableLoading,
} from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableSearch } from "@/components/ui/data-table-search";
import { DeleteConfirmationDialog } from "@/components/operations/delete-dialog";
import { OperationsHeader } from "@/components/operations/header";
import { OperationsTabs } from "@/components/operations/tabs";
import { createColumns } from "@/components/operations/columns";
import { OperationCreationSheet } from "@/components/operations/creation-sheet";

export const OperationsTable = () => {
  const { t } = useTranslation("operations");
  const { t: tDashboard } = useTranslation("dashboard");
  const formatDate = useFormatDate();

  // Filters state
  const [filters, setFilters] = useState<OperationsListFilters>({
    conformity: "all",
    search: "",
    page: 1,
    perPage: 15,
    sortBy: null,
    sortOrder: "asc",
  });

  // Table state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [creationSheetOpen, setCreationSheetOpen] = useState(false);

  const debouncedSearch = useDebouncedValue(filters.search, 300);

  // Queries
  const { data: counts, isLoading: isCountsLoading } = useOperationsCounts();
  const { data, isLoading, isPlaceholderData } = useOperations({
    ...filters,
    search: debouncedSearch,
  });

  const deleteMutation = useDeleteOperations();

  // Columns
  const columns = useMemo(
    () => createColumns({ t, formatDate }),
    [t, formatDate],
  );

  // Table instance
  const table = useReactTable<Operation>({
    data: data?.data ?? [],
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id,
    enableRowSelection: true,
  });

  // Derived state
  const selectedIds = Object.keys(rowSelection).filter(
    (id) => rowSelection[id],
  );

  // Handlers
  const handleTabChange = (tab: ConformityFilter) => {
    setFilters((filters) => ({ ...filters, conformity: tab, page: 1 }));
    setRowSelection({});
  };

  const handleSearchChange = (search: string) => {
    setFilters((filters) => ({ ...filters, search, page: 1 }));
  };

  const handleCreateClick = () => {
    setCreationSheetOpen(true);
  };

  const handleDelete = () => {
    deleteMutation.mutate(selectedIds, {
      onSuccess: () => {
        setRowSelection({});
        setDeleteDialogOpen(false);
      },
    });
  };

  return (
    <>
      <OperationsHeader onCreateClick={handleCreateClick} />

      <div className="flex items-start justify-between mt-1">
        <OperationsTabs
          activeTab={filters.conformity}
          onTabChange={handleTabChange}
          counts={counts ?? { all: 0, conform: 0, nonConform: 0 }}
          isLoading={isCountsLoading}
        />
        <div className="flex items-center gap-4">
          {selectedIds.length > 0 && (
            <Button
              variant="ghost"
              onClick={() => setDeleteDialogOpen(true)}
              className="h-9 gap-2 font-display text-base font-medium leading-5 text-foreground"
            >
              <Trash2 className="h-4 w-4" />
              {t("delete")}
            </Button>
          )}
          <DataTableSearch
            value={filters.search}
            onChange={handleSearchChange}
            placeholder={tDashboard("searchPlaceholder")}
          />
        </div>
      </div>

      {isLoading ? (
        <DataTableLoading colSpan={columns.length} />
      ) : (
        <DataTable
          table={table}
          className={cn(isPlaceholderData && "opacity-60")}
        >
          <DataTableContent>
            <DataTableHeader />
            <DataTableBody emptyMessage={t("table.empty")} />
          </DataTableContent>
        </DataTable>
      )}

      <DataTablePagination
        filters={filters}
        setFilters={setFilters}
        totalPages={data?.pagination.totalPages ?? 1}
        perPageLabel={t("perPage")}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        count={selectedIds.length}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />

      <OperationCreationSheet
        open={creationSheetOpen}
        onOpenChange={setCreationSheetOpen}
      />
    </>
  );
};
