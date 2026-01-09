import { PDFDocument } from "pdf-lib";

export async function fillPdfForm(pdfBytes, formValues) {
  try {
    const pdfDoc = await PDFDocument.load(pdfBytes);

    let form;
    try {
      form = pdfDoc.getForm();
    } catch {
      // PDF has no form, just return the original bytes
      return await pdfDoc.save();
    }

    const fields = form.getFields();
    if (fields.length === 0) {
      // No fields to fill, return original
      return await pdfDoc.save();
    }

    for (const [fieldName, value] of Object.entries(formValues)) {
      if (value === undefined || value === null || value === "") continue;

      // Try as text field
      try {
        const textField = form.getTextField(fieldName);
        if (textField && typeof value === "string") {
          textField.setText(value);
          continue;
        }
      } catch {
        // Not a text field
      }

      // Try as checkbox
      try {
        const checkbox = form.getCheckBox(fieldName);
        if (checkbox) {
          if (value === true || value === "true" || value === "on") {
            checkbox.check();
          } else {
            checkbox.uncheck();
          }
          continue;
        }
      } catch {
        // Not a checkbox
      }

      // Try as radio group
      try {
        const radioGroup = form.getRadioGroup(fieldName);
        if (radioGroup && typeof value === "string") {
          radioGroup.select(value);
          continue;
        }
      } catch {
        // Not a radio group
      }

      // Try as dropdown
      try {
        const dropdown = form.getDropdown(fieldName);
        if (dropdown && typeof value === "string") {
          dropdown.select(value);
          continue;
        }
      } catch {
        // Not a dropdown
      }
    }

    const modifiedPdfBytes = await pdfDoc.save();
    return modifiedPdfBytes;
  } catch (error) {
    console.error("Error filling PDF form:", error);
    // If anything fails, try to return the original PDF
    try {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      return await pdfDoc.save();
    } catch {
      // Last resort: return original bytes as Uint8Array
      return new Uint8Array(pdfBytes);
    }
  }
}

export function downloadPdf(pdfBytes, filename) {
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
