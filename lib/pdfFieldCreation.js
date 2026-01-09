import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

/**
 * Convert pixel coordinates to PDF points
 * PDF origin is bottom-left, DOM origin is top-left
 */
export function pixelsToPdfPoints(pixelRect, pageElement, scale) {
  const pageRect = pageElement.getBoundingClientRect();

  // Convert to unscaled coordinates
  const x = pixelRect.x / scale;
  const y = pixelRect.y / scale;
  const width = pixelRect.width / scale;
  const height = pixelRect.height / scale;

  // Get page height in unscaled pixels
  const pageHeightUnscaled = pageRect.height / scale;

  // Convert to PDF coordinates (invert Y axis)
  return {
    x: x,
    y: pageHeightUnscaled - y - height,
    width: width,
    height: height,
  };
}

/**
 * Generate a unique field name
 */
export function generateFieldName(type, pageIndex, existingCount) {
  return `custom_${type}_${pageIndex}_${existingCount}`;
}

/**
 * Add custom fields to a PDF document
 */
export async function addCustomFieldsToPdf(pdfBytes, customFields) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  for (const field of customFields) {
    const page = pdfDoc.getPage(field.pageIndex);

    switch (field.type) {
      case "text": {
        const textField = form.createTextField(field.name);
        textField.addToPage(page, {
          x: field.x,
          y: field.y,
          width: field.width,
          height: field.height,
          borderWidth: 1,
          borderColor: rgb(0, 0, 0),
        });
        textField.setFontSize(12);
        break;
      }

      case "checkbox": {
        const checkbox = form.createCheckBox(field.name);
        checkbox.addToPage(page, {
          x: field.x,
          y: field.y,
          width: field.width,
          height: field.height,
          borderWidth: 1,
          borderColor: rgb(0, 0, 0),
        });
        break;
      }

      case "signature": {
        // Create signature as a text field with special styling
        const sigField = form.createTextField(field.name);
        sigField.addToPage(page, {
          x: field.x,
          y: field.y,
          width: field.width,
          height: field.height,
          borderWidth: 1,
          borderColor: rgb(0.5, 0, 0.5),
          backgroundColor: rgb(0.98, 0.98, 1),
        });
        sigField.setFontSize(14);
        break;
      }
    }
  }

  return pdfDoc.save();
}

/**
 * Create a unique ID for a field
 */
export function createFieldId() {
  return `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
