import React from "react";
import AdminLayout from "./AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold">Processing</h2>
          <p className="text-3xl font-bold mt-2">32</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-semibold">Delivered</h2>
          <p className="text-3xl font-bold mt-2">88</p>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
