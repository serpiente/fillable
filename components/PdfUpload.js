"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function PdfUpload() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else if (selectedFile) {
      toast.error("Please select a PDF file");
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsLoading(true);

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

      // Download the returned PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `filled-${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success("PDF converted successfully!");

      // Reset form
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">PDF Form Filler</h1>
      <p className="text-base-content/70 text-center max-w-md">
        Upload a PDF and we&apos;ll detect and make the form fields fillable.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full"
          disabled={isLoading}
        />

        {file && (
          <p className="text-sm text-base-content/60">
            Selected: {file.name}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!file || isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Converting...
            </>
          ) : (
            "Convert PDF"
          )}
        </button>
      </form>

      {isLoading && (
        <p className="text-sm text-base-content/60 text-center">
          This may take up to 30 seconds on first request...
        </p>
      )}
    </div>
  );
}
