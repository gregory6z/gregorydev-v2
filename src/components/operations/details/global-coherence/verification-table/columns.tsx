import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { StatusBadge } from "@/components/operations/status-badge";
import { TruncatedText } from "@/components/operations/details/files-table/truncated-text";
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
        <TruncatedText
          text={row.original.stepName || ""}
          className="font-medium text-black"
        />
      );
    },
    meta: { width: "17%" },
  },
  {
    id: "verification",
    accessorFn: (row) => row.subVerification.name,
    header: () => t("globalCoherence.table.verification"),
    cell: ({ row }) => (
      <TruncatedText
        text={row.original.subVerification.name}
        className="text-black"
      />
    ),
    meta: { width: "19%" },
  },
  {
    id: "status",
    accessorFn: (row) => row.subVerification.status,
    header: () => t("globalCoherence.table.status"),
    cell: ({ row }) => (
      <StatusBadge status={row.original.subVerification.status} />
    ),
    meta: { width: "14%" },
  },
  {
    id: "comment",
    accessorFn: (row) => row.subVerification.comment,
    header: () => t("globalCoherence.table.comment"),
    cell: ({ row }) => (
      <TruncatedText
        text={row.original.subVerification.comment}
        className="text-sm text-black"
      />
    ),
    meta: { width: "50%" },
  },
];
