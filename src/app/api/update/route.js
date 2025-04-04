import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const { _id, ...updatedData } = await request.json();
    const client = await clientPromise;
    const db = client.db("Hero-Cars");

    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(_id) }, { $set: updatedData });

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "No changes made or product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
