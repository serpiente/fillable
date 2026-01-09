"use client";

import { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { usePdfFormCapture } from "@/hooks/usePdfFormCapture";
import { fillPdfForm, downloadPdf } from "@/lib/pdfUtils";

const PdfViewer = dynamic(() => import("./pdf/PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ),
});

export default function PdfUpload() {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const fileInputRef = useRef(null);
  const viewerContainerRef = useRef(null);

  const { formValues, captureCurrentValues } = usePdfFormCapture(viewerContainerRef);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setPdfData(null);
    } else if (selectedFile) {
      toast.error("Please select a PDF file");
      e.target.value = "";
    }
  };

  const handleConvert = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsConverting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/pdf/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Conversion failed");
      }

      const arrayBuffer = await response.arrayBuffer();
      setPdfData(arrayBuffer);

      toast.success("PDF converted! You can now fill the form.");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = useCallback(async () => {
    if (!pdfData) return;

    setIsGeneratingPdf(true);

    try {
      const currentValues = captureCurrentValues();
      const allValues = { ...formValues, ...currentValues };

      const filledPdfBytes = await fillPdfForm(pdfData, allValues);

      downloadPdf(filledPdfBytes, `filled-${file?.name || "document.pdf"}`);

      toast.success("PDF downloaded!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [pdfData, formValues, captureCurrentValues, file]);

  const handleReset = () => {
    setFile(null);
    setPdfData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Viewer mode
  if (pdfData) {
    return (
      <div className="flex flex-col items-center w-full h-full" ref={viewerContainerRef}>
        <PdfViewer
          pdfData={pdfData}
          onDownload={handleDownload}
          onReset={handleReset}
          isGenerating={isGeneratingPdf}
        />
      </div>
    );
  }

  // Upload mode
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">PDF Form Filler</h1>
      <p className="text-base-content/70 text-center max-w-md">
        Upload a PDF and we&apos;ll detect and make the form fields fillable.
      </p>

      <form onSubmit={handleConvert} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full"
          disabled={isConverting}
        />

        {file && (
          <p className="text-sm text-base-content/60">
            Selected: {file.name}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!file || isConverting}
        >
          {isConverting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Converting...
            </>
          ) : (
            "Convert PDF"
          )}
        </button>
      </form>

      {isConverting && (
        <p className="text-sm text-base-content/60 text-center">
          This may take up to 30 seconds on first request...
        </p>
      )}
    </div>
  );
}
