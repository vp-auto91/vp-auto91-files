import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, phone, name, message } = await request.json();

    const transporter = nodemailer.createTransport({
      host: "mail.vpauto91.fr",
      port: 465,
      secure: true,
      auth: {
        user: "contact@vpauto91.fr",
        pass: "@vpauto91.fr",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `${email}`,
      to: "contact@vpauto91.fr",
      subject: "New Contact Form Submission",
      text: `
Un utilisateur à rempli le formulaire de contact sur le site contact@vpauto91.fr :
        
Email: ${email}
        
Téléphone: ${phone}
        
Nom et prénom: ${name}
        
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}

// Optionally add other HTTP methods if needed
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
