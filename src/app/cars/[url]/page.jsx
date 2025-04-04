"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultSingle from "@/Components/Single Page/DefaultSingle";
import ProductSkeleton from "@/Components/Single Page/ProductSkeleton";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer";

export default function ProductPage() {
  const { url } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/product?url=${encodeURIComponent(url)}`);

        if (res.ok) {
          const data = await res.json();
          setProduct(data.product);
        } else {
          console.error("Failed to fetch product:", await res.json());
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [url]);

  if (loading) {
    return (
      <div className="">
        <Header />
        <ProductSkeleton />
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-500">
        Product not found
        <div className="mt-4 text-sm text-gray-600">
          No product matched: {url}
        </div>
      </div>
    );
  }

  return (
    <main className="">
      <Header />
      <DefaultSingle product={product} />
      <Footer />
    </main>
  );
}
