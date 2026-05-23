import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      projectType,
      message,
    } = body;

    await resend.emails.send({
      from: "onboarding@resend.dev",

      to: process.env.ADMIN_EMAIL!,

      subject: "New Contact Form Submission",

      html: `
        <div style="font-family:sans-serif">
          <h2>New Contact Inquiry</h2>

          <p><strong>Full Name:</strong> ${fullName}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${phone}</p>

          <p><strong>Project Type:</strong> ${projectType}</p>

          <p><strong>Message:</strong></p>

          <p>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}