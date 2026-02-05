"use no memo";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useFormatDate } from "@/hooks/use-format-date";
import { useOperations, operationsKeys } from "@/api/operations/queries";
import { useDeleteOperations } from "@/api/operations/mutations";
import type {
  OperationsListFilters,
  ConformityFilter,
  SortableField,
  Operation,
} from "@/api/operations/schemas/list";

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
import { OperationCreationSheet } from "@/components/operations/creation-sheet";
import { OperationsHeader } from "@/components/operations/header";
import { createColumns } from "@/components/operations/operations-table/columns";
import { DeleteConfirmationDialog } from "@/components/operations/operations-table/delete-dialog";
import { OperationsTabs } from "@/components/operations/tabs";

export const OperationsTable = () => {
  const { t } = useTranslation("operations");

  const formatDate = useFormatDate();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
  const { data, isLoading, isPlaceholderData, isError } = useOperations({
    ...filters,
    search: debouncedSearch,
  });

  const deleteMutation = useDeleteOperations();

  // Extract counts from response
  const counts = data?.meta.counts;
  const tabCounts = {
    all: counts?.all ?? 0,
    conform: counts?.conforme ?? 0,
    nonConform: counts?.nonConforme ?? 0,
    nonAnalysed: counts?.nonAnalysed ?? 0,
  };

  // Handlers
  const handleRowClick = (operation: Operation) => {
    navigate(`/operations/${operation.id}`);
  };

  // Columns - React Compiler handles memoization
  const columns = createColumns({
    t,
    formatDate,
  });

  // Table instance
  const table = useReactTable<Operation>({
    data: data?.data ?? [],
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);

      if (newSorting.length > 0) {
        const { id, desc } = newSorting[0];
        setFilters((filters) => ({
          ...filters,
          sortBy: id as SortableField,
          sortOrder: desc ? "desc" : "asc",
          page: 1,
        }));
      } else {
        setFilters((filters) => ({
          ...filters,
          sortBy: null,
          sortOrder: "asc",
          page: 1,
        }));
      }
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.id),
    enableRowSelection: true,
    manualSorting: true,
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
    deleteMutation.mutate(selectedIds.map(Number), {
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: operationsKeys.lists() });
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
          counts={tabCounts}
          isLoading={isLoading}
        />
        <div className="flex items-center gap-4">
          {selectedIds.length > 0 && (
            <Button
              variant="ghost"
              onClick={() => setDeleteDialogOpen(true)}
              className="h-9 gap-2 font-display text-base font-medium text-foreground"
            >
              <Trash2 className="size-4" />
              {t("delete")}
            </Button>
          )}
          <DataTableSearch
            value={filters.search}
            onChange={handleSearchChange}
            placeholder={t("searchPlaceholder")}
          />
        </div>
      </div>

      {isLoading ? (
        <DataTableLoading colSpan={columns.length} />
      ) : isError ? (
        <div className="py-10 text-center text-sm text-gray-disabled">
          {t("table.error")}
        </div>
      ) : (
        <DataTable
          table={table}
          className={cn(isPlaceholderData && "opacity-60")}
        >
          <DataTableContent>
            <DataTableHeader />
            <DataTableBody
              emptyMessage={t("table.empty")}
              onRowClick={handleRowClick}
              excludeClickColumns={["select"]}
            />
          </DataTableContent>
        </DataTable>
      )}

      <DataTablePagination
        filters={filters}
        setFilters={setFilters}
        totalPages={data?.meta.totalPages ?? 1}
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
