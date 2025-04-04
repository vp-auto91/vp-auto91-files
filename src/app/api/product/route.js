import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    const client = await clientPromise;
    const db = client.db("Hero-Cars");

    // First try to find by ID (extracted from URL)
    const idPart = url.split("-").pop(); // Get last part of URL
    if (ObjectId.isValid(idPart)) {
      const productById = await db.collection("products").findOne({
        _id: new ObjectId(idPart),
      });
      if (productById) {
        return NextResponse.json({ product: productById }, { status: 200 });
      }
    }

    // Fallback to model matching if ID not found
    const productByModel = await db.collection("products").findOne({
      model: { $regex: new RegExp(url.replace(/-/g, "[-\\s]"), "i") },
    });

    if (!productByModel) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product: productByModel }, { status: 200 });
  } catch (error) {
    console.error("Error finding product:", error);
    return NextResponse.json(
      { error: "Failed to find product" },
      { status: 500 }
    );
  }
}
