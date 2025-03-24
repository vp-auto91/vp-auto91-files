// app/api/get/route.js
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Hero-Cars"); // আপনার ডাটাবেসের নাম ব্যবহার করুন
    const products = await db
      .collection("products")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    // ডেটা JSON আকারে রিটার্ন করুন
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("প্রোডাক্ট ডেটা fetch করতে সমস্যা:", error);
    return NextResponse.json(
      { error: "প্রোডাক্ট ডেটা fetch করতে ব্যর্থ হয়েছে" },
      { status: 500 }
    );
  }
}
