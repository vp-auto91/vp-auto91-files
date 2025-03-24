import Footer from "@/Components/Footer";
import Header from "@/Components/Header/Header";
import Image from "next/image";
import React from "react";
import { FaShieldAlt, FaCheckCircle, FaHeadset, FaClock } from "react-icons/fa";

const Garantie = () => {
  return (
    <div className="">
      <Header />
      <div className=" pt-12 pb-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-orange-400 mb-4">
            Garantie et Services
          </h2>
          <div className="flex gap-8">
            <div className="md:w-1/2">
              {/* Introductory Text */}
              <p className="text-sm text-gray-600  text-justify mx-auto mb-5">
                Chez nous, votre satisfaction et votre tranquillité d'esprit
                sont notre priorité. Nous offrons une gamme complète de
                garanties et services pour vous assurer une expérience d'achat
                sans souci. Découvrez ci-dessous les avantages exclusifs que
                nous proposons à nos clients.
              </p>
              <p className="text-sm text-gray-600  text-justify mx-auto mb-5">
                Chez nous, votre satisfaction et votre tranquillité d'esprit
                sont notre priorité. Nous offrons une gamme complète de
                garanties et services pour vous assurer une expérience d'achat
                sans souci. Découvrez ci-dessous les avantages exclusifs que
                nous proposons à nos clients.
              </p>
              <p className="text-sm text-gray-600  text-justify mx-auto mb-12">
                Chez nous, votre satisfaction et votre tranquillité d'esprit
                sont notre priorité. Nous offrons une gamme complète de
                garanties et services pour vous assurer une expérience d'achat
                sans souci. Découvrez ci-dessous les avantages exclusifs que
                nous proposons à nos clients.
              </p>
              <p className="text-sm text-gray-600  text-justify mx-auto mb-5">
                Chez nous, votre satisfaction et votre tranquillité d'esprit
                sont notre priorité. Nous offrons une gamme complète de
                garanties et services pour vous assurer une expérience d'achat
                sans souci. Découvrez ci-dessous les avantages exclusifs que
                nous proposons à nos clients.
              </p>
              <p className="text-sm text-gray-600  text-justify mx-auto mb-12">
                Chez nous, votre satisfaction et votre tranquillité d'esprit
                sont notre priorité. Nous offrons une gamme complète de
                garanties et services pour vous assurer une expérience d'achat
                sans souci. Découvrez ci-dessous les avantages exclusifs que
                nous proposons à nos clients.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/banner.webp"
                alt="Hybrid Electric Cars"
                width={700}
                height={500}
                className="rounded-lg object-fill"
              />
            </div>
          </div>
          {/* Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {/* Point 1: Garantie Complète */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center">
                <FaShieldAlt className="text-4xl text-orange-400 mb-4" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantie Complète</h3>
              <p className="text-gray-600">
                Profitez d'une garantie complète sur tous nos véhicules pour une
                tranquillité d'esprit totale.
              </p>
            </div>

            {/* Point 2: Véhicules Vérifiés */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center">
                <FaCheckCircle className="text-4xl text-orange-400 mb-4" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Véhicules Vérifiés</h3>
              <p className="text-gray-600">
                Tous nos véhicules passent une inspection rigoureuse pour
                garantir leur qualité et fiabilité.
              </p>
            </div>

            {/* Point 3: Support Client 24/7 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center">
                <FaHeadset className="text-4xl text-orange-400 mb-4" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Support Client 24/7
              </h3>
              <p className="text-gray-600">
                Notre équipe est disponible 24/7 pour répondre à vos questions
                et résoudre vos problèmes.
              </p>
            </div>

            {/* Point 4: Service Rapide */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center">
                <FaClock className="text-4xl text-orange-400 mb-4" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Service Rapide</h3>
              <p className="text-gray-600">
                Nous offrons des services rapides et efficaces pour répondre à
                vos besoins en un temps record.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Garantie;
