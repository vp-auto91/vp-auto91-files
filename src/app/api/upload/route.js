// app/api/upload/route.js
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Cloudinary কনফিগার করুন
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    // ফাইলকে ArrayBuffer-এ রূপান্তর করুন
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Cloudinary-তে ইমেজ আপলোড করুন
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ folder: "products" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(buffer);
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Cloudinary-তে ইমেজ আপলোড করতে সমস্যা:", error);
    return NextResponse.json(
      { error: "ইমেজ আপলোড করতে ব্যর্থ হয়েছে" },
      { status: 500 }
    );
  }
}
