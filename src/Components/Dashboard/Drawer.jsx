"use client";
import React, { useState } from "react";
import ProductUploadForm from "./AddProduct";
import EditableProducts from "./EditableProducts";
import Deleteprod from "./Deleteprod";

const Drawer = () => {
  const [activeView, setActiveView] = useState("add"); // 'add', 'edit', or 'delete'

  return (
    <div className="md:flex items-center">
      <div className="md:w-1/3">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden bg-orange-300 border-none"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side bg-white z-50">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-white border-r-1 border-orange-300 text-black min-h-full w-80 p-4 z-50">
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
  );
};

export default Drawer;
