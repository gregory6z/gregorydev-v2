"use no memo";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import {
  DataTable,
  DataTableContent,
  DataTableHeader,
  DataTableBody,
} from "@/components/ui/data-table";
import type { DocumentVerification } from "@/api/operations/schemas";
import { createAnalysisColumns } from "./columns";

type AnalysisTableProps = {
  verifications: DocumentVerification[];
};

export function AnalysisTable({ verifications }: AnalysisTableProps) {
  const { t } = useTranslation("operations");

  const columns = useMemo(() => createAnalysisColumns(t), [t]);

  const table = useReactTable({
    data: verifications,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div data-slot="analysis-table" className="space-y-4">
      <h3 className="font-display text-lg font-semibold text-primary">
        {t("documentDialog.analysis")}
      </h3>

      <DataTable table={table}>
        <DataTableContent>
          <DataTableHeader />
          <DataTableBody emptyMessage={t("documentDialog.noVerifications")} />
        </DataTableContent>
      </DataTable>
    </div>
  );
}
