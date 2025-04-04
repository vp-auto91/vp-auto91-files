"use client"; // Mark as a client component for interactivity
import Footer from "@/Components/Footer";
import Header from "@/Components/Header/Header";
import Head from "next/head";
import { useState } from "react";

const ContactPage = () => {
  const pageDescription =
    "Besoin d'aide sur votre boîte DSG ou DC4 ? Contactez notre support technique pour un diagnostic rapide et précis.";
  const HeadingText = "Envoyez-nous un message, Assistance rapide";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTel, setIsTel] = useState(false);
  const [isError, setIsError] = useState(false);

  const isPhoneNumberValid = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone || !isPhoneNumberValid(formData.phone)) {
      setIsTel(true);
      return;
    }

    try {
      const response = await fetch("/api/contactForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsOk(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
    console.log("Form Data Submitted:", formData); // Log form data to console
    setIsSubmitted(true); // Show success message
    setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
  };

  return (
    <div className="">
      <Header />
      <div className="mx-auto px-5 py-12">
        <h2 className="text-2xl font-bold text-center text-orange-400 mb-4">
          Contactez nous
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Side: Content */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-gray-800">
              Nous sommes là pour vous aider!
            </h2>
            <h4 className="text-gray-900 text-sm font-[500]">
              Vous avez une question? N’hésitez pas à nous contacter. Notre
              équipe s’engage à vous répondre sous 24:00
            </h4>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Adresse</h3>
                <p className="text-gray-900">CARS</p>
                <p className="text-gray-900">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ullam, delectus!
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-900">0123456789</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Email</h3>
                <p className="text-gray-900">contact@demo</p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="rounded-lg">
            <h2 className="text-md font-bold text-gray-800 mb-6">
              Envoyez-nous un message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom / Prénom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <p className="text-orange-300">
                {isTel
                  ? "Erreur lors de l'envoi du formulaire, vérifier votre numéro de téléphone"
                  : ""}
              </p>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-orange-300 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Success Message */}
            {isSubmitted ? (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                Formulaire envoyé avec succès
              </div>
            ) : (
              <p className="text-orange-300"></p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
