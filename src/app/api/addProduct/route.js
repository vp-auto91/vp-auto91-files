// app/api/addProduct/route.js
import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
  try {
    // Parse the incoming request body
    const productData = await req.json();

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("Hero-Cars"); // Use the correct database name

    // Insert the product data into the `products` collection
    const result = await db.collection("products").insertOne(productData);

    // Check if the insertion was successful
    if (result.acknowledged) {
      return new Response(
        JSON.stringify({
          message: "Product added successfully",
          id: result.insertedId,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(JSON.stringify({ error: "Failed to add product" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error adding product:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
