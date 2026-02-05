import { useTranslation } from "react-i18next";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  DataTable,
  DataTableContent,
  DataTableHeader,
  DataTableBody,
} from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/icons";
import { useFormatDate } from "@/hooks/use-format-date";
import type { OperationFile } from "@/api/operations/schemas";
import { createFilesColumns } from "./columns";

type FilesTableProps = {
  files: OperationFile[];
  onUploadNewVersion: (fileId: string) => void;
  onAddFile: () => void;
};

export function FilesTable({
  files,
  onUploadNewVersion,
  onAddFile,
}: FilesTableProps) {
  const { t } = useTranslation("operations");
  const formatDate = useFormatDate();

  const columns = createFilesColumns(t, formatDate, onUploadNewVersion);

  const table = useReactTable({
    data: files,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[34px] font-normal leading-[140%]">
            {t("details.files.title")}
          </h2>
          <Button
            onClick={onAddFile}
            className="bg-primary-dark hover:bg-primary-dark/90 font-display font-semibold text-base leading-5"
          >
            <PlusIcon className="size-3 mr-2" />
            {t("details.files.addFile")}
          </Button>
        </div>

        <DataTable table={table} className="w-full">
          <DataTableContent>
            <DataTableHeader />
            <DataTableBody emptyMessage={t("table.empty")} rowHeight="100px" />
          </DataTableContent>
        </DataTable>
      </div>
    </TooltipProvider>
  );
}
