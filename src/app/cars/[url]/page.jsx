// app/cars/[url]/page.jsx
import DefaultSingle from "@/Components/Single Page/DefaultSingle";
import clientPromise from "@/app/lib/mongodb";

async function fetchProduct(url) {
  try {
    const client = await clientPromise;
    const db = client.db("Hero-Cars"); // আপনার ডাটাবেসের নাম
    const product = await db.collection("products").findOne({ url });

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }) {
  const { url } = params; // URL প্যারামিটার থেকে `url` নিন
  const product = await fetchProduct(url);

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <main>
      <DefaultSingle product={product} />
    </main>
  );
}
