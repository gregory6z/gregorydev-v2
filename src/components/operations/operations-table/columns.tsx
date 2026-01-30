import type { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableSortableHeader } from "@/components/ui/data-table";
import type { Operation } from "@/api/operations/schemas";
import { StatusBadge } from "./status-badge";
import { ConformityBadge } from "./conformity-badge";

type ColumnConfig = {
  t: (key: string) => string;
  formatDate: (date: string) => string;
};

export const createColumns = ({
  t,
  formatDate,
}: ColumnConfig): ColumnDef<Operation>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    size: 40,
  },
  {
    accessorKey: "reference",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} title={t("table.reference")} />
    ),
    cell: ({ row }) => (
      <span
        className="block truncate max-w-[250px]"
        title={row.getValue("reference")}
      >
        {row.getValue("reference")}
      </span>
    ),
    size: 250,
  },
  {
    accessorKey: "filesCount",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} title={t("table.filesCount")} />
    ),
    size: 100,
  },
  {
    accessorKey: "delegataire",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} title={t("table.delegataire")} />
    ),
    size: 180,
  },
  {
    accessorKey: "engagementDate",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        title={t("table.engagementDate")}
      />
    ),
    cell: ({ row }) => formatDate(row.getValue("engagementDate")),
    size: 160,
  },
  {
    accessorKey: "fost",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} title={t("table.fost")} />
    ),
    size: 140,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} title={t("table.status")} />
    ),
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    size: 120,
  },
  {
    accessorKey: "conformity",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} title={t("table.conformity")} />
    ),
    cell: ({ row }) => (
      <ConformityBadge conformity={row.getValue("conformity")} />
    ),
    size: 140,
  },
];
