import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { TruncatedText } from "@/components/operations/details/files-table/truncated-text";
import type { NonConformity } from "@/api/operations/schemas/conformity";

export const createIssuesColumns = (
  t: TFunction,
): ColumnDef<NonConformity>[] => [
  {
    accessorKey: "issue",
    header: () => t("globalConformity.nonConformitiesTable.issue"),
    cell: ({ row }) => <TruncatedText text={row.getValue("issue")} />,
  },
  {
    accessorKey: "correction",
    header: () => t("globalConformity.nonConformitiesTable.correction"),
    cell: ({ row }) => <TruncatedText text={row.getValue("correction")} />,
  },
];
