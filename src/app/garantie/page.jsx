import Footer from "@/Components/Footer";
import Header from "@/Components/Header/Header";
import Image from "next/image";
import React from "react";
import { FaShieldAlt, FaCheckCircle, FaHeadset, FaClock } from "react-icons/fa";

const Garantie = () => {
  console.log("hello");
  return (
    <div className="">
      <Header />
      <div className=" pt-12 pb-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-orange-400 mb-4">
            Nos garanties
          </h2>
          <div className="flex gap-8">
            <div className="md:w-1/2">
              {/* Introductory Text */}
              <p className="text-sm text-gray-600  text-justify mx-auto mb-5">
                Chez nous, chaque voiture vendue est bien plus qu’un simple
                véhicule : c’est une promesse de qualité, de sécurité et de
                tranquillité d’esprit. Depuis plus de 10 ans, notre garage
                s'engage à offrir à ses clients des véhicules soigneusement
                sélectionnés et entièrement révisés. Grâce à notre expérience,
                notre priorité est de garantir votre satisfaction à chaque étape
                de l’achat.
              </p>
              <p className="text-sm text-gray-600  text-justify mx-auto mb-5">
                Avant d’être mise en vente, chaque voiture passe par notre
                atelier pour un contrôle complet : révision mécanique, vidange,
                remplacement des fluides, entretien courant, contrôle des
                freins, pneus, batterie, et passage au contrôle technique. Vous
                repartez avec une voiture en parfait état, prête à rouler, sans
                mauvaise surprise.
              </p>
              <p className="text-sm text-gray-600  text-justify mx-auto mb-5">
                Nous savons qu’acheter une voiture est une décision importante.
                C’est pourquoi toutes nos voitures sont vendues avec 3 mois de
                garantie, vous offrant une sécurité supplémentaire et
                l’assurance d’un service après-vente réactif et professionnel en
                cas de besoin. En tant que garage professionnel, nous avons
                l'expertise nécessaire pour vous accompagner en toute confiance.
              </p>
              <p className="text-sm text-gray-600  text-justify mx-auto mb-5">
                Forts de 10 années d’existence, nous avons su bâtir une relation
                de confiance avec nos clients. Notre réputation repose sur
                la transparence, la qualité de nos véhicules et l’attention
                portée à chaque acheteur. Que vous cherchiez une citadine, une
                familiale ou un utilitaire, vous trouverez chez nous un véhicule
                fiable, révisé, garanti, et prêt à vous accompagner.
              </p>
            </div>
            <div className="md:w-1/2 ">
              <Image
                src="/images/g2.webp"
                alt="Hybrid Electric Cars"
                width={600}
                height={500}
                className="rounded-lg mx-auto"
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
