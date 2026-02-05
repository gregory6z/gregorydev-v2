import { Page } from "react-pdf";
import { useInView } from "react-intersection-observer";

type LazyPageProps = {
  pageNumber: number;
  scale: number;
  width?: number;
};

export function LazyPage({ pageNumber, scale, width }: LazyPageProps) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: "200px 0px", // Pre-load pages 200px before they become visible
    threshold: 0,
  });

  return (
    <div
      ref={ref}
      className="shadow-lg mb-4 bg-white"
      style={{
        minHeight: inView ? undefined : "800px", // Placeholder height when not in view
      }}
    >
      {inView ? (
        <Page
          pageNumber={pageNumber}
          scale={scale}
          width={width}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          loading={
            <div className="flex items-center justify-center h-[800px] bg-gray-100">
              <div className="animate-pulse text-muted-foreground">
                Chargement page {pageNumber}...
              </div>
            </div>
          }
        />
      ) : (
        <div className="flex items-center justify-center h-[800px] bg-gray-100">
          <span className="text-muted-foreground text-sm">
            Page {pageNumber}
          </span>
        </div>
      )}
    </div>
  );
}
