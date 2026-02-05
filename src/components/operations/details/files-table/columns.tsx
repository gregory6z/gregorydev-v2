import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import type { OperationFile } from "@/api/operations/schemas";
import { DataTableSortableHeader } from "@/components/ui/data-table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileUploadIcon } from "@/components/icons";
import { StatusBadge } from "@/components/operations/status-badge";
import { TruncatedText } from "@/components/operations/details/files-table/truncated-text";

export const createFilesColumns = (
  t: TFunction,
  formatDate: (date: string) => string,
  onUploadNewVersion: (fileId: string) => void,
): ColumnDef<OperationFile>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        title={t("details.files.name")}
      />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
    size: 180,
  },
  {
    accessorKey: "summary",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        title={t("details.files.summary")}
      />
    ),
    cell: ({ row }) => <TruncatedText text={row.getValue("summary")} />,
    size: 650,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        title={t("details.files.date")}
      />
    ),
    cell: ({ row }) => formatDate(row.getValue("date")),
    size: 120,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableSortableHeader
        column={column}
        title={t("details.files.status")}
      />
    ),
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    size: 160,
  },
  {
    id: "newVersion",
    header: () => (
      <span className="text-sm font-medium">
        {t("details.files.newVersion")}
      </span>
    ),
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger
          onClick={() => onUploadNewVersion(row.original.id)}
          className="inline-flex items-center justify-center size-9 rounded-md hover:bg-muted cursor-pointer"
        >
          <FileUploadIcon className="size-[18px]" />
        </TooltipTrigger>
        <TooltipContent>{t("details.files.uploadNewVersion")}</TooltipContent>
      </Tooltip>
    ),
    size: 60,
  },
];
