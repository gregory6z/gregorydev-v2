import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import {
  DataTable,
  DataTableContent,
  DataTableHeader,
  DataTableBody,
} from "@/components/ui/data-table";
import type { VerificationStep } from "@/api/operations/schemas";
import { createVerificationColumns, type VerificationRow } from "./columns";

type VerificationTableProps = {
  steps: VerificationStep[];
};

export function VerificationTable({ steps }: VerificationTableProps) {
  const { t } = useTranslation("operations");

  // Flatten steps into rows for table display
  // Each sub-verification becomes a row, with step name shown only on first sub
  const rows: VerificationRow[] = useMemo(
    () =>
      steps.flatMap((step) =>
        step.subVerifications.map((sub, index) => ({
          stepId: step.id,
          stepName: index === 0 ? step.name : null,
          rowSpan: index === 0 ? step.subVerifications.length : 0,
          subVerification: sub,
        })),
      ),
    [steps],
  );

  const columns = useMemo(() => createVerificationColumns(t), [t]);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.subVerification.id,
  });

  return (
    <DataTable table={table} className="w-full">
      <DataTableContent>
        <DataTableHeader />
        <DataTableBody emptyMessage={t("table.empty")} rowHeight="76px" />
      </DataTableContent>
    </DataTable>
  );
}
