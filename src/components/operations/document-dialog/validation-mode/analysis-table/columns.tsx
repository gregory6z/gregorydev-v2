import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import type { DocumentVerification } from "@/api/operations/schemas";
import { VerificationStatusBadge } from "../verification-status-badge";

export const createAnalysisColumns = (
  t: TFunction,
): ColumnDef<DocumentVerification>[] => [
  {
    accessorKey: "name",
    header: () => (
      <span className="text-sm font-medium">
        {t("documentDialog.analysisTable.verification")}
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("name")}</span>
    ),
    size: 250,
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-sm font-medium">
        {t("documentDialog.analysisTable.status")}
      </span>
    ),
    cell: ({ row }) => (
      <VerificationStatusBadge status={row.getValue("status")} />
    ),
    size: 80,
  },
  {
    accessorKey: "comment",
    header: () => (
      <span className="text-sm font-medium">
        {t("documentDialog.analysisTable.comment")}
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("comment")}
      </span>
    ),
  },
];
