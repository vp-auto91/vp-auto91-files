import Footer from "@/Components/Footer";
import Header from "@/Components/Header/Header";

const AboutUs = () => {
  return (
    <div className="">
      <Header />
      {/* Mission Statement */}
      <div className="pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mb-32">
          <h2 className="text-2xl font-bold text-center text-orange-400 mb-4">
            Qui sommes-nous ?
          </h2>

          <p className="text-sm text-gray-600  text-justify mb-5">
            Nous sommes un garage spécialisé dans l’achat, la préparation et la
            revente de véhicules d’occasion. Depuis plus de 10 ans, notre
            mission est de proposer à nos clients des voitures fiables,
            entretenues et garanties, prêtes à prendre la route en toute
            sérénité.
          </p>
          <p className="text-sm text-gray-600  text-justify mb-5">
            Notre expertise se concentre sur les moteurs et les boîtes de
            vitesses, éléments clés de tout véhicule. Avant chaque mise en
            vente, nos véhicules sont entièrement révisés : diagnostic
            électronique complet, vidange moteur, contrôle des boîtes manuelles
            ou automatiques, remplacement des filtres, des fluides, contrôle
            freinage, pneus, batterie, climatisation… Rien n’est laissé au
            hasard.
          </p>
          <p className="text-sm text-gray-600  text-justify mb-5">
            Vous avez besoin d’un coup de pouce pour financer votre achat ? Nous
            proposons des solutions de financement personnalisées, simples,
            rapides et adaptées à votre budget. Notre équipe est à votre écoute
            pour étudier votre dossier et vous proposer un plan clair et
            transparent.
          </p>
          <p className="text-sm text-gray-600  text-justify mb-5">
            Nous travaillons avec sérieux, exigence et transparence, et nous
            bâtissons une relation durable avec chacun de nos clients. Notre
            objectif : que vous repartiez avec le bon véhicule, au bon prix, en
            toute confiance.
          </p>
          <p className="text-sm text-gray-600  text-justify mb-5">
            Que vous cherchiez une citadine économique, une berline familiale ou
            un utilitaire robuste, notre sélection évolue chaque
            semaine. Contactez-nous dès maintenant ou passez nous voir au garage
            pour découvrir nos véhicules disponibles et bénéficier de conseils
            d’experts.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
