import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal  text-black p-10">
        <aside>
          <p>
            VP AUTO 91
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <a className="link link-hover">Qui sommes-nous</a>
          <a className="link link-hover">Contactez nous</a>
          <a className="link link-hover">Nos garanties</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <div className="px-12">
        <hr className="text-gray-300 mb-3" />
        <p className="text-sm text-center pb-3">
          © All rights reserved 2025 VP AUTO 91
        </p>
      </div>
    </div>
  );
};

export default Footer;
