import React from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar */}
      <SideMenu activeMenu={activeMenu} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;
