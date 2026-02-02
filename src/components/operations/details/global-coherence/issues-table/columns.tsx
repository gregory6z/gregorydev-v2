import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { TruncatedText } from "@/components/operations/details/files-table/truncated-text";
import type { NonConformity } from "@/api/operations/schemas";

export const createIssuesColumns = (
  t: TFunction,
): ColumnDef<NonConformity>[] => [
  {
    accessorKey: "issue",
    header: () => t("globalCoherence.nonConformitiesTable.issue"),
    cell: ({ row }) => <TruncatedText text={row.getValue("issue")} />,
    size: 400,
  },
  {
    accessorKey: "correction",
    header: () => t("globalCoherence.nonConformitiesTable.correction"),
    cell: ({ row }) => <TruncatedText text={row.getValue("correction")} />,
    size: 600,
  },
];
