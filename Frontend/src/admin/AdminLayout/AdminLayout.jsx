import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className={`flex min-h-screen bg-gray-100 overflow-hidden`}>
      <aside
        className={`
          fixed inset-y-0 left-0 w-64 bg-gray-800 text-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-lg font-bold text-[#ffd700]">Admin Panel</h1>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        <div className="h-full flex flex-col overflow-y-auto">
          <AdminSidebar closeSidebar={() => setOpen(false)} />
          <div className="mt-auto p-4 text-xs text-gray-400">v1.0</div>
        </div>
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40"
        ></div>
      )}

      <div
        className={`
          flex-1 flex flex-col min-h-screen 
          transition-all duration-300
          lg:ml-64
          ${open ? "max-w-screen overflow-hidden" : "overflow-x-hidden"}
        `}
      >
        <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-20">
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <FaBars size={22} />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <span className="font-medium">{user?.name || "Admin"}</span>
        </header>

        <main className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
