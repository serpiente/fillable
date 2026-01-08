import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Forward to CommonForms API
    const apiFormData = new FormData();
    apiFormData.append("file", file);

    const response = await fetch(
      "https://serpiente--commonforms-api-web.modal.run/convert",
      {
        method: "POST",
        headers: {
          "X-API-Key": process.env.COMMONFORMS_API_KEY,
        },
        body: apiFormData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || "API request failed" },
        { status: response.status }
      );
    }

    // Return PDF binary
    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="filled-${file.name}"`,
      },
    });
  } catch (error) {
    console.error("PDF convert error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
