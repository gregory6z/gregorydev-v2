import * as React from "react";
import type { Table as TanStackTable, flexRender } from "@tanstack/react-table";
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

const DataTableContext = React.createContext<DataTableContextValue<unknown>>(
  null!,
);

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
}

function DataTableContent({ children, className }: DataTableContentProps) {
  return <Table className={className}>{children}</Table>;
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
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              style={{ width: header.column.getSize() }}
            >
              {header.isPlaceholder
                ? null
                : render(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

/* -----------------------------------------------------------------------------
 * DataTableBody
 * -------------------------------------------------------------------------- */

interface DataTableBodyProps {
  className?: string;
  emptyMessage?: string;
}

function DataTableBody({
  className,
  emptyMessage = "No results.",
}: DataTableBodyProps) {
  const { table } = useDataTable();

  return (
    <TableBody className={className}>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                {render(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
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
