import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal  text-black p-10">
        <nav>
          <h6 className="text-red-500 font-bold">VP AUTO 91</h6>
          <p className="">Mécanique</p>
          <p className="">Parallélisme</p>
          <p className="">Nos garanties</p>
        </nav>

        <nav>
          <h6 className="footer-title">Liens utiles</h6>
          <Link href="/about-us" className="link link-hover">
            Qui sommes-nous
          </Link>
          <Link href="/contact" className="link link-hover">
            Contactez nous
          </Link>
          <Link href="/garantie" className="link link-hover">
            Nos garanties
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link href="/" className="link link-hover">
            Mentions Legales
          </Link>
          <Link href="/" className="link link-hover">
            Conditions Utilisation
          </Link>
          <Link href="/" className="link link-hover">
            Politique Confidentialité
          </Link>
          {/* <a className="link link-hover">Politique Cookies</a> */}
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
