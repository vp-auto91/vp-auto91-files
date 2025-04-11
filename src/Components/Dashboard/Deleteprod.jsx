"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Deleteprod() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/get");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/delete?id=${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the product list
        fetchProducts();
        router.refresh();
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-4">No products found</div>;
  }

  return (
    <div className="p-4 w-full mx-auto overflow-y-scroll max-h-[700px] px-5">
      <h1 className="text-2xl font-bold mb-6">Supprimer des produits</h1>

      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
              {product.model && <p className="text-sm">{product.model}</p>}
            </div>
            <button
              onClick={() => handleDelete(product._id)}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
