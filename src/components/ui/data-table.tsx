"use no memo";

import * as React from "react";
import type { Table as TanStackTable } from "@tanstack/react-table";
import { flexRender as render } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* -----------------------------------------------------------------------------
 * Context
 * -------------------------------------------------------------------------- */

type DataTableContextValue<TData> = {
  table: TanStackTable<TData>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTableContext = React.createContext<DataTableContextValue<any>>(null!);

function useDataTable<TData>() {
  const context = React.useContext(
    DataTableContext,
  ) as DataTableContextValue<TData>;
  if (!context) {
    throw new Error("DataTable components must be used within <DataTable>");
  }
  return context;
}

/* -----------------------------------------------------------------------------
 * DataTable (Root)
 * -------------------------------------------------------------------------- */

interface DataTableProps<TData> {
  table: TanStackTable<TData>;
  children: React.ReactNode;
  className?: string;
}

function DataTable<TData>({
  table,
  children,
  className,
}: DataTableProps<TData>) {
  return (
    <DataTableContext.Provider value={{ table }}>
      <div data-slot="data-table" className={cn("w-full", className)}>
        {children}
      </div>
    </DataTableContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * DataTableContent (Table wrapper)
 * -------------------------------------------------------------------------- */

interface DataTableContentProps {
  children: React.ReactNode;
  className?: string;
  /** When true, disables horizontal scroll and allows text to wrap */
  wrapText?: boolean;
}

function DataTableContent({
  children,
  className,
  wrapText,
}: DataTableContentProps) {
  return (
    <Table className={className} wrapText={wrapText}>
      {children}
    </Table>
  );
}

/* -----------------------------------------------------------------------------
 * DataTableHeader
 * -------------------------------------------------------------------------- */

interface DataTableHeaderProps {
  className?: string;
}

function DataTableHeader({ className }: DataTableHeaderProps) {
  const { table } = useDataTable();

  return (
    <TableHeader className={className}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const meta = header.column.columnDef.meta as
              | { width?: string }
              | undefined;
            const width = meta?.width ?? header.column.columnDef.size;
            return (
              <TableHead key={header.id} style={{ width }}>
                {header.isPlaceholder
                  ? null
                  : render(header.column.columnDef.header, header.getContext())}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}

/* -----------------------------------------------------------------------------
 * DataTableBody
 * -------------------------------------------------------------------------- */

interface DataTableBodyProps<TData> {
  className?: string;
  emptyMessage?: string;
  onRowClick?: (row: TData) => void;
  /** Column IDs that should NOT trigger row click (e.g., "select" for checkboxes) */
  excludeClickColumns?: string[];
  /** Custom row height (e.g., "100px") */
  rowHeight?: string;
  /** When true, allows text to wrap in cells */
  wrapText?: boolean;
}

function DataTableBody<TData>({
  className,
  emptyMessage = "No results.",
  onRowClick,
  excludeClickColumns = [],
  rowHeight,
  wrapText,
}: DataTableBodyProps<TData>) {
  const { table } = useDataTable<TData>();

  const handleCellClick = (
    row: TData,
    columnId: string,
    e: React.MouseEvent,
  ) => {
    if (!onRowClick) return;
    if (excludeClickColumns.includes(columnId)) return;
    // Don't trigger if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (target.closest("button, a, input, [role='checkbox']")) return;
    onRowClick(row);
  };

  return (
    <TableBody className={className}>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            className={onRowClick ? "cursor-pointer" : undefined}
          >
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta as
                | { width?: string }
                | undefined;
              const width = meta?.width ?? cell.column.columnDef.size;
              return (
                <TableCell
                  key={cell.id}
                  style={{
                    width,
                    height: rowHeight,
                  }}
                  wrapText={wrapText}
                  onClick={(e) =>
                    handleCellClick(row.original, cell.column.id, e)
                  }
                >
                  {render(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center"
          >
            {emptyMessage}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

/* -----------------------------------------------------------------------------
 * DataTableSortableHeader
 * -------------------------------------------------------------------------- */

import type { Column } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTableSortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

function DataTableSortableHeader<TData, TValue>({
  column,
  title,
}: DataTableSortableHeaderProps<TData, TValue>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="-ml-3 h-8"
    >
      {title}
      <ChevronsUpDown className="ml-1 h-3 w-3" />
    </Button>
  );
}

/* -----------------------------------------------------------------------------
 * DataTableLoading
 * -------------------------------------------------------------------------- */

interface DataTableLoadingProps {
  colSpan: number;
  className?: string;
}

function DataTableLoading({ colSpan, className }: DataTableLoadingProps) {
  return (
    <div data-slot="data-table-loading" className={cn("w-full", className)}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={colSpan} className="h-24 text-center">
              <div className="flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------- */

export {
  DataTable,
  DataTableContent,
  DataTableHeader,
  DataTableBody,
  DataTableSortableHeader,
  DataTableLoading,
  useDataTable,
};
