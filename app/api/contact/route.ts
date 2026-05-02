import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import ContactSubmission from "@/lib/models/ContactSubmission";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phoneNumber, subject, message, consent } = body;

    // Basic server-side validation
    if (!fullName || !email || !subject || !message || consent === undefined) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newSubmission = await ContactSubmission.create({
      fullName,
      email,
      phoneNumber,
      subject,
      message,
      consent: consent === 'on' || consent === true, // handle string 'on' from FormData or boolean
    });

    return NextResponse.json(
      { success: true, submission: newSubmission },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving contact submission:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
