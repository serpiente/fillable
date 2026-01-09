import { PDFDocument } from "pdf-lib";

export async function fillPdfForm(pdfBytes, formValues) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  for (const [fieldName, value] of Object.entries(formValues)) {
    if (value === undefined || value === null) continue;

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
      if (checkbox && typeof value === "boolean") {
        if (value) {
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
