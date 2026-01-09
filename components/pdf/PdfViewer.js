"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfViewer({
  pdfData,
  onDownload,
  onReset,
  isGenerating,
}) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(0.6);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
  }, []);

  const zoomIn = () => setScale((s) => Math.min(2, s + 0.1));
  const zoomOut = () => setScale((s) => Math.max(0.5, s - 0.1));
  const prevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const nextPage = () => setCurrentPage((p) => Math.min(numPages || 1, p + 1));

  return (
    <div className="flex flex-col w-full h-full">
      {/* PDF Document - Main focus */}
      <div className="flex-1 overflow-auto bg-base-200 flex justify-center p-4">
        <Document
          file={pdfData}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center p-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
          error={
            <div className="flex items-center justify-center p-8 text-error">
              Failed to load PDF
            </div>
          }
        >
          <Page
            pageNumber={currentPage}
            scale={scale}
            renderAnnotationLayer={true}
            renderTextLayer={true}
            renderForms={true}
            className="shadow-lg"
          />
        </Document>
      </div>

      {/* Bottom Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-3 p-3 bg-base-100 border-t border-base-300">
        {/* Upload Another */}
        {onReset && (
          <button className="btn btn-sm btn-ghost" onClick={onReset}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            New PDF
          </button>
        )}

        <div className="divider divider-horizontal mx-0"></div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <button
            className="btn btn-sm btn-ghost"
            onClick={zoomOut}
            disabled={scale <= 0.5}
            aria-label="Zoom out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="text-sm min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
          <button
            className="btn btn-sm btn-ghost"
            onClick={zoomIn}
            disabled={scale >= 2}
            aria-label="Zoom in"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <div className="divider divider-horizontal mx-0"></div>

        {/* Page navigation */}
        <div className="flex items-center gap-1">
          <button
            className="btn btn-sm btn-ghost"
            disabled={currentPage <= 1}
            onClick={prevPage}
            aria-label="Previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm min-w-[4rem] text-center">
            {currentPage} / {numPages || "..."}
          </span>
          <button
            className="btn btn-sm btn-ghost"
            disabled={currentPage >= numPages}
            onClick={nextPage}
            aria-label="Next page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="divider divider-horizontal mx-0"></div>

        {/* Download button */}
        <button
          className="btn btn-sm btn-primary"
          onClick={onDownload}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Generating...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </>
          )}
        </button>
      </div>
    </div>
  );
}
