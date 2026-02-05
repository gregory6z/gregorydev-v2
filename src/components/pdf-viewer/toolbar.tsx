import { Button } from "@/components/ui/button";
import { Minus, Plus, Download, Printer } from "lucide-react";

type PdfToolbarProps = {
  totalPages: number;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload: () => void;
  onPrint: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
};

export function PdfToolbar({
  totalPages,
  zoom,
  onZoomIn,
  onZoomOut,
  onDownload,
  onPrint,
  canZoomIn,
  canZoomOut,
}: PdfToolbarProps) {
  const zoomPercent = Math.round(zoom * 100);

  return (
    <div
      data-slot="pdf-toolbar"
      className="flex items-center justify-between px-4 py-3 bg-[#ECEBE8]"
    >
      {/* Left side - Page count and zoom */}
      <div className="flex items-center gap-4">
        {/* Page count */}
        <span className="text-sm font-medium text-foreground">
          {totalPages} {totalPages === 1 ? "page" : "pages"}
        </span>

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onZoomOut}
            disabled={!canZoomOut}
            aria-label="Zoom arrière"
          >
            <Minus className="h-4 w-4" />
          </Button>

          <span className="text-sm text-foreground min-w-[40px] text-center">
            {zoomPercent}%
          </span>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onZoomIn}
            disabled={!canZoomIn}
            aria-label="Zoom avant"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onDownload}
          aria-label="Télécharger"
        >
          <Download className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onPrint}
          aria-label="Imprimer"
        >
          <Printer className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
