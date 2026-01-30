import { useState } from "react";

type UsePdfViewerOptions = {
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
};

type UsePdfViewerReturn = {
  currentPage: number;
  totalPages: number;
  zoom: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
};

export const usePdfViewer = (
  options: UsePdfViewerOptions = {},
): UsePdfViewerReturn => {
  const {
    initialZoom = 1,
    minZoom = 0.5,
    maxZoom = 2,
    zoomStep = 0.1,
  } = options;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [zoom, setZoom] = useState(initialZoom);

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + zoomStep, maxZoom));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - zoomStep, minZoom));
  };

  const resetZoom = () => {
    setZoom(initialZoom);
  };

  return {
    currentPage,
    totalPages,
    zoom,
    setCurrentPage,
    setTotalPages,
    zoomIn,
    zoomOut,
    resetZoom,
    canZoomIn: zoom < maxZoom,
    canZoomOut: zoom > minZoom,
  };
};
