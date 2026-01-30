import { useState, useEffect } from "react";
import { Document, pdfjs } from "react-pdf";
import { PdfToolbar } from "./toolbar";
import { LazyPage } from "./lazy-page";
import { cn } from "@/lib/utils";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker from public folder
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

type PdfViewerProps = {
  file: File | string | null;
  className?: string;
};

// Custom hook to handle file source with proper cleanup
// Note: setState in effect is intentional here - we need to create blob URL
// and clean it up when file changes. This is a valid use case for external resource sync.
function useFileSource(file: File | string | null) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBlobUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setBlobUrl(null);
    }
  }, [file]);

  if (!file) return null;
  if (typeof file === "string") return file;
  return blobUrl;
}

export function PdfViewer({ file, className }: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [zoom, setZoom] = useState(1);
  const fileSource = useFileSource(file);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));

  const handleDownload = () => {
    if (!file) return;

    const url = typeof file === "string" ? file : URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = typeof file === "string" ? "document.pdf" : file.name;
    link.click();

    if (typeof file !== "string") {
      URL.revokeObjectURL(url);
    }
  };

  const handlePrint = () => {
    if (!fileSource) return;

    const printWindow = window.open(fileSource);
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    }
  };

  if (!file || !fileSource) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted rounded-lg",
          className,
        )}
      >
        <p className="text-muted-foreground">Aucun document</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg overflow-hidden bg-[#ECEBE8]",
        className,
      )}
    >
      <PdfToolbar
        totalPages={numPages}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onDownload={handleDownload}
        onPrint={handlePrint}
        canZoomIn={zoom < 2}
        canZoomOut={zoom > 0.5}
      />

      <div className="flex-1 overflow-auto p-4 flex flex-col items-center gap-4 bg-[#ECEBE8]">
        <Document
          file={fileSource}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Chargement...</p>
            </div>
          }
          error={
            <div className="flex items-center justify-center h-64">
              <p className="text-destructive">Erreur de chargement du PDF</p>
            </div>
          }
        >
          {Array.from({ length: numPages }, (_, index) => (
            <LazyPage
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={zoom}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
