"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomTextEditor from "./CustomTextEditor";

export default function EditableProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    model: "",
    description: "",
    gearbox: "",
    brand: "",
    year: "",
    mileage: "",
    fuel: "",
    location: "",
    images: [],
    extraFields: [],
  });
  const [newExtraField, setNewExtraField] = useState({ name: "", value: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/get");
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setEditForm({
      ...product,
      extraFields: product.extraFields || [],
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      price: "",
      model: "",
      description: "",
      gearbox: "",
      brand: "",
      year: "",
      mileage: "",
      fuel: "",
      location: "",
      images: [],
      extraFields: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExtraFieldChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExtraFields = [...editForm.extraFields];
    updatedExtraFields[index][name] = value;
    setEditForm((prev) => ({
      ...prev,
      extraFields: updatedExtraFields,
    }));
  };

  const addExtraField = () => {
    if (newExtraField.name && newExtraField.value) {
      setEditForm((prev) => ({
        ...prev,
        extraFields: [...prev.extraFields, newExtraField],
      }));
      setNewExtraField({ name: "", value: "" });
    }
  };

  const removeExtraField = (index) => {
    const updatedExtraFields = [...editForm.extraFields];
    updatedExtraFields.splice(index, 1);
    setEditForm((prev) => ({
      ...prev,
      extraFields: updatedExtraFields,
    }));
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setImageUploading(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data.url) {
        setEditForm((prev) => ({
          ...prev,
          images: [...prev.images, data.url],
        }));
      } else {
        console.error("Upload error:", data.error);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        fetchProducts();
        setEditingId(null);
        router.refresh();
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <div className="w-full mx-auto overflow-y-scroll max-h-[700px] px-5">
      <h1 className="text-2xl font-bold mb-6">Modifier les produits </h1>

      <div className="grid grid-cols-1 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-6 shadow-md">
            {editingId === product._id ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left side - Basic info */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
                    <div className="space-y-3">
                      {["name", "price", "model", "description"].map(
                        (field) => (
                          <div key={field}>
                            <label className="block text-sm font-medium capitalize">
                              {field}
                            </label>
                            {field === "description" ? (
                              <div className="border rounded-md">
                                <CustomTextEditor
                                  value={editForm.description}
                                  onChange={(newValue) =>
                                    setEditForm((prev) => ({
                                      ...prev,
                                      description: newValue,
                                    }))
                                  }
                                />
                              </div>
                            ) : (
                              <input
                                type={field === "price" ? "number" : "text"}
                                name={field}
                                value={editForm[field]}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                              />
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Right side - Tech details */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Technical</h2>
                    <div className="space-y-3">
                      {[
                        "gearbox",
                        "brand",
                        "year",
                        "mileage",
                        "fuel",
                        "location",
                      ].map((field) => (
                        <div key={field}>
                          <label className="block text-sm font-medium capitalize">
                            {field}
                          </label>
                          <input
                            type={
                              ["year", "mileage"].includes(field)
                                ? "number"
                                : "text"
                            }
                            name={field}
                            value={editForm[field]}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Extra Fields */}
                <div className="">
                  <h2 className="text-xl font-semibold mb-4">Extra Fields</h2>
                  {editForm.extraFields.map((field, index) => (
                    <div key={index} className="md:flex gap-2 mb-2">
                      <input
                        type="text"
                        name="name"
                        value={field.name}
                        onChange={(e) => handleExtraFieldChange(e, index)}
                        className="flex-1 p-2 border rounded md:mb-0 mb-5"
                        placeholder="Field name"
                      />
                      <input
                        type="text"
                        name="value"
                        value={field.value}
                        onChange={(e) => handleExtraFieldChange(e, index)}
                        className="flex-1 p-2 border rounded"
                        placeholder="Field value"
                      />
                      <button
                        type="button"
                        onClick={() => removeExtraField(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="md:flex gap-2 mt-3">
                    <input
                      type="text"
                      name="name"
                      value={newExtraField.name}
                      onChange={(e) =>
                        setNewExtraField({
                          ...newExtraField,
                          name: e.target.value,
                        })
                      }
                      className="flex-1 p-2 border rounded md:mb-0 mb-5"
                      placeholder="New field name"
                    />
                    <input
                      type="text"
                      name="value"
                      value={newExtraField.value}
                      onChange={(e) =>
                        setNewExtraField({
                          ...newExtraField,
                          value: e.target.value,
                        })
                      }
                      className="flex-1 p-2 border rounded md:mb-0 mb-5"
                      placeholder="New field value"
                    />
                    <button
                      type="button"
                      onClick={addExtraField}
                      className="px-3 py-2 bg-blue-500 text-white rounded"
                    >
                      Add Field
                    </button>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">Images</h2>
                  <div className="flex flex-wrap gap-3">
                    {editForm.images?.map((img, index) => (
                      <div key={index} className="relative w-24 h-24 group">
                        <img
                          src={img}
                          alt={`Product ${index}`}
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updatedImages = [...editForm.images];
                            updatedImages.splice(index, 1);
                            setEditForm((prev) => ({
                              ...prev,
                              images: updatedImages,
                            }));
                          }}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) handleImageUpload(file);
                        e.target.value = "";
                      }}
                      className="p-2 border rounded w-full"
                    />
                    {imageUploading && (
                      <p className="text-sm text-blue-500 mt-2">
                        Uploading image...
                      </p>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="md:flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-orange-500">
                      {product.name}
                    </h2>
                    <p className="text-lg text-orange-500 font-bold">
                      {product.price}€
                    </p>
                    <p className="text-xl font-bold text-gray-700">
                      {product.model}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEditClick(product)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </div>

                <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
                  <p
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
                  {[
                    "gearbox",
                    "brand",
                    "year",
                    "mileage",
                    "fuel",
                    "location",
                  ].map(
                    (field) =>
                      product[field] && (
                        <div
                          key={field}
                          className="border border-red-500 rounded-lg p-3 bg-gray-100"
                        >
                          <p className="text-sm text-gray-600 font-semibold capitalize">
                            {field}
                          </p>
                          <p className="text-gray-800">{product[field]}</p>
                        </div>
                      )
                  )}
                  {product.extraFields?.map((field, index) => (
                    <div
                      key={index}
                      className="border border-red-500 rounded-lg p-3 bg-gray-100"
                    >
                      <p className="text-sm text-gray-600 font-semibold">
                        {field.name}
                      </p>
                      <p className="text-gray-800">{field.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
