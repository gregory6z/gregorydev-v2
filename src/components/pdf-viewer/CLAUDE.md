# PDF Viewer

## Structure

- `index.tsx` - Main component (memoized)
- `lazy-page.tsx` - Lazy-loaded page with IntersectionObserver
- `toolbar.tsx` - Zoom, download, print controls

## Worker

The PDF.js worker is served from `/public/pdf.worker.min.mjs`.

The worker file must match the pdfjs-dist version used by react-pdf (not the one installed directly). After updating react-pdf, copy the worker from `node_modules/react-pdf/node_modules/pdfjs-dist/build/`.

## Optimizations

- Lazy loading with IntersectionObserver (200px preload margin)
- Memoized components to prevent unnecessary re-renders
- Local worker (no CDN dependency)

## Styling

- Background: #ECEBE8
- Toolbar: same background, no borders
- Pages: shadow-lg, white background
