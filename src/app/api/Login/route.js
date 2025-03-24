// app/api/login/route.js

import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("Hero-Cars"); // Use the correct database name

    // Find the user in the `Auth` collection
    const user = await db.collection("Auth").findOne({ email, pass: password });

    if (user) {
      return new Response(JSON.stringify({ message: "Login successful" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
