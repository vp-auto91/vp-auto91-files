"use client";
import React, { useState } from "react";
import ProductUploadForm from "./AddProduct";
import EditableProducts from "./EditableProducts";
import Deleteprod from "./Deleteprod";
import Footer from "../Footer";
import Header from "../Header/Header";
import Link from "next/link";

const Drawer = () => {
  const [activeView, setActiveView] = useState("add"); // 'add', 'edit', or 'delete'

  return (
    <div className="">
      <Header />
      <div className="md:flex items-center">
        <div className="md:w-1/3">
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden bg-red-400 border-none"
              >
                Open drawer
              </label>
            </div>
            <div className="drawer-side z-50 md:z-0 bg-white md:bg-none">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-white md:bg-none   border-r-1 border-red-400 text-black min-h-full w-80 p-4 z-50">
                <li>
                  <a
                    onClick={() => setActiveView("add")}
                    className={activeView === "add" ? "active" : ""}
                  >
                    Add products
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveView("edit")}
                    className={activeView === "edit" ? "active" : ""}
                  >
                    Edit products
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveView("delete")}
                    className={activeView === "delete" ? "active" : ""}
                  >
                    Delete products
                  </a>
                </li>
                <li>
                  <Link href="/">Home</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 p-4">
          {activeView === "add" && <ProductUploadForm />}
          {activeView === "edit" && <EditableProducts />}
          {activeView === "delete" && <Deleteprod />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Drawer;
