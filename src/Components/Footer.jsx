import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal  text-black p-10">
        <nav>
          <h6 className="text-red-500 font-bold">VP AUTO 91</h6>
          <a className="link link-hover">Mécanique</a>
          <a className="link link-hover">Parallélisme</a>
          <a className="link link-hover">Nos garanties</a>
        </nav>

        <nav>
          <h6 className="footer-title">Liens utiles</h6>
          <a className="link link-hover">Qui sommes-nous</a>
          <a className="link link-hover">Contactez nous</a>
          <a className="link link-hover">Nos garanties</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Mentions Legales</a>
          <a className="link link-hover">Conditions Utilisation</a>
          <a className="link link-hover">Politique Confidentialité</a>
          <a className="link link-hover">Politique Cookies</a>
        </nav>
      </footer>
      <div className="px-12">
        <hr className="text-gray-300 mb-3" />
        <p className="text-sm text-center pb-3">
          © Tous droits réservés 2025 VP AUTO 91
        </p>
      </div>
    </div>
  );
};

export default Footer;
