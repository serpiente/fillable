import { NextResponse } from "next/server";

// This route is used to store the leads that are generated from the landing page.
// The API call is initiated by <ButtonLead /> component and <EmailGateModal />
export async function POST(req) {
  const body = await req.json();

  if (!body.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  try {
    const { createClient } = await import("@/libs/supabase/server");
    const supabase = await createClient();

    const { error } = await supabase
      .from("leads")
      .insert({ email: body.email });

    if (error) {
      // Handle duplicates gracefully - email already exists is not an error for the user
      if (error.code === "23505") {
        return NextResponse.json({ success: true, existing: true });
      }
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Lead insert error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
