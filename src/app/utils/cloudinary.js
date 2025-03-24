// utils/cloudinary.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ইমেজ আপলোড করার ফাংশন
const uploadImage = async (imagePath) => {
  try {
    // Cloudinary-তে ইমেজ আপলোড করুন
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "products", // ইমেজগুলোকে "products" ফোল্ডারে সংরক্ষণ করুন
    });
    return result.secure_url; // আপলোড করা ইমেজের URL রিটার্ন করুন
  } catch (error) {
    console.error("Cloudinary-তে ইমেজ আপলোড করতে সমস্যা:", error);
    throw error;
  }
};

module.exports = uploadImage;
