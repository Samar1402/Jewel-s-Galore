import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  // useAuth assumes path is '../Context/AuthContext' relative to admin/AdminLayout.jsx
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        // full viewport height (top/bottom) + vertical scroll
        className={`fixed left-0 top-0 bottom-0 w-64 bg-gray-800 text-white
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-300 z-50 overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-lg font-bold text-[#ffd700]">Admin Panel</h1>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Make the inner container fill height so its children can lay out properly */}
        <div className="h-full flex flex-col">
          <AdminSidebar closeSidebar={() => setOpen(false)} />
          {/* optional footer inside sidebar */}
          <div className="mt-auto p-4 text-xs text-gray-400">v1.0</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="flex-1 flex flex-col min-h-screen ml-0 lg:ml-64">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <FaBars />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <span>{user?.name || "Admin"}</span>
        </header>

        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </section>
    </div>
  );
};

export default AdminLayout;