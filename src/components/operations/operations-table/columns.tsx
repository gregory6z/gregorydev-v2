import type { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableSortableHeader } from "@/components/ui/data-table";
import type { Operation } from "@/api/operations/schemas/list";
import { StatusBadge } from "@/components/operations/status-badge";

type ColumnConfig = {
  t: (key: string) => string;
  formatDate: (date: string) => string;
  isPrincipal: boolean;
};

export const createColumns = ({
  t,
  formatDate,
  isPrincipal,
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
    id: "title",
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} title={t("table.reference")} />
    ),
    cell: ({ row }) => (
      <span className="block truncate max-w-[250px]" title={row.original.title}>
        {row.original.title}
      </span>
    ),
    size: 250,
  },
  {
    accessorKey: "filesCount",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} title={t("table.filesCount")} />
    ),
    enableSorting: false,
    size: 100,
  },
  {
    id: isPrincipal ? "producer" : "principal",
    accessorFn: (row) =>
      (isPrincipal ? row.producer?.name : row.principal?.name) ?? "-",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        title={t(isPrincipal ? "table.entreprise" : "table.delegataire")}
      />
    ),
    size: 180,
  },
  {
    id: "ceeEngagedAt",
    accessorKey: "ceeEngagedAt",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        title={t("table.engagementDate")}
      />
    ),
    cell: ({ row }) => {
      const date = row.original.ceeEngagedAt;
      return date ? formatDate(date) : "-";
    },
    size: 160,
  },
  {
    id: "fost",
    accessorFn: (row) => row.fost?.title ?? "-",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} title={t("table.fost")} />
    ),
    size: 140,
  },
  {
    id: "lifeCycleStatus",
    accessorKey: "lifeCycleStatus",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} title={t("table.status")} />
    ),
    cell: ({ row }) => (
      <StatusBadge code={row.original.lifeCycleStatus.code} type="lifeCycle" />
    ),
    size: 120,
  },
  {
    id: "conformityStatus",
    accessorKey: "conformityStatus",
    header: ({ column }) => (
      <DataTableSortableHeader column={column} title={t("table.conformity")} />
    ),
    cell: ({ row }) => (
      <StatusBadge
        code={row.original.conformityStatus?.code ?? null}
        type="conformity"
      />
    ),
    size: 140,
  },
];
