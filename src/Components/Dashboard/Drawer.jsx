"use client";
import React from "react";
import ProductUploadForm from "./AddProduct";

const Drawer = () => {
  return (
    <div className="flex items-center">
      <div className="w-1/3">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu border-r-1 border-orange-300 text-black  min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <a>Add products</a>
              </li>
              <li>
                <a>Edit products</a>
              </li>
              <li>
                <a>Change Password</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <ProductUploadForm />
      </div>
    </div>
  );
};

export default Drawer;
