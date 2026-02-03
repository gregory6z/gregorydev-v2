import { useTranslation } from "react-i18next";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import {
  DataTable,
  DataTableContent,
  DataTableHeader,
  DataTableBody,
} from "@/components/ui/data-table";
import type { NonConformity } from "@/api/operations/schemas";
import { createIssuesColumns } from "@/components/operations/details/global-coherence/issues-table/columns";

type IssuesTableProps = {
  issues: NonConformity[];
};

export function IssuesTable({ issues }: IssuesTableProps) {
  const { t } = useTranslation("operations");

  const columns = createIssuesColumns(t);

  const table = useReactTable({
    data: issues,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  if (issues.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        {t("globalCoherence.noNonConformities")}
      </p>
    );
  }

  return (
    <DataTable table={table} className="w-full">
      <DataTableContent wrapText>
        <DataTableHeader />
        <DataTableBody
          emptyMessage={t("table.empty")}
          rowHeight="76px"
          wrapText
        />
      </DataTableContent>
    </DataTable>
  );
}
