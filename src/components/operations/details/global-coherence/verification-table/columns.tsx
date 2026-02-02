import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { StatusBadge } from "@/components/operations/status-badge";
import type { SubVerification } from "@/api/operations/schemas";

export type VerificationRow = {
  stepId: string;
  stepName: string | null;
  rowSpan: number;
  subVerification: SubVerification;
};

export const createVerificationColumns = (
  t: TFunction,
): ColumnDef<VerificationRow>[] => [
  {
    id: "step",
    accessorFn: (row) => row.stepName,
    header: () => t("globalCoherence.table.step"),
    cell: ({ row }) => {
      if (row.original.rowSpan === 0) return null;
      return (
        <span className="font-medium text-foreground">
          {row.original.stepName}
        </span>
      );
    },
    size: 200,
  },
  {
    id: "verification",
    accessorFn: (row) => row.subVerification.name,
    header: () => t("globalCoherence.table.verification"),
    cell: ({ row }) => (
      <span className="text-foreground">{row.original.subVerification.name}</span>
    ),
    size: 280,
  },
  {
    id: "status",
    accessorFn: (row) => row.subVerification.status,
    header: () => t("globalCoherence.table.status"),
    cell: ({ row }) => (
      <StatusBadge status={row.original.subVerification.status} />
    ),
    size: 140,
  },
  {
    id: "comment",
    accessorFn: (row) => row.subVerification.comment,
    header: () => t("globalCoherence.table.comment"),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.subVerification.comment}
      </span>
    ),
  },
];
