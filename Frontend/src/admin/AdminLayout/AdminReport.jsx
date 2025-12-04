import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { authFetch } from "../../utils/api";
import { FaDownload, FaFilePdf, FaFileCsv, FaSearch } from "react-icons/fa";

const AdminReports = () => {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "",
  });

  const getReportsData = async () => {
    const res = await authFetch("/api/orders/admin", {}, localStorage.getItem("token"));
    if (res.ok) {
      setOrders(res.data.data); 
      setFiltered(res.data.data);
    } else {
        console.error("Failed to fetch admin reports:", res.data.message);
        setOrders([]);
        setFiltered([]);
    }
  };

  useEffect(() => {
    getReportsData();
  }, []);

  const applyFilter = () => {
    let data = [...orders];

    if (filters.startDate)
      data = data.filter(
        (o) => new Date(o.createdAt) >= new Date(filters.startDate)
      );

    if (filters.endDate)
      data = data.filter(
        (o) => new Date(o.createdAt) <= new Date(filters.endDate)
      );

    if (filters.status)
      data = data.filter((o) => o.status.toLowerCase() === filters.status.toLowerCase());

    setFiltered(data);
  };

  const exportCSV = () => {
    let csv = "OrderID,Customer,Amount,Status,Date\n"; 
    filtered.forEach((o) => {
        const customerName = o.user ? o.user.name : 'N/A';
        const amountValue = o.totalAmount || 0; 
        csv += `${o._id},${customerName},${amountValue},${o.status},${new Date(o.createdAt).toISOString()}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.csv";
    link.click();
  };

  return (
    <AdminLayout>
      <div className="w-full">

        <h1 className="text-3xl font-bold mb-6">📄 Reports</h1>
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">Filter Reports</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium">Start Date</label>
                  <input
                    type="date"
                    className="p-2 w-full border rounded"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">End Date</label>
                  <input
                    type="date"
                    className="p-2 w-full border rounded"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    className="p-2 w-full border rounded"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  >
                    <option value="">All</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                    <option value="pending">Pending</option> 
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={applyFilter}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 w-full justify-center"
                  >
                    <FaSearch /> Apply
                  </button>
                </div>
          </div>
        </div>
        
        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={exportCSV}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaFileCsv /> Export CSV
          </button>

          <button
            onClick={() => window.print()}
            className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaFilePdf /> Export PDF
          </button>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No records found
                  </td>
                </tr>
              ) : (
                filtered.map((o, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="p-2 border">{o._id}</td> 
                    <td className="p-2 border">{o.user ? o.user.name : 'N/A'}</td> 
                    <td className="p-2 border">₹{o.totalAmount}</td>
                    <td className="p-2 border capitalize">{o.status}</td>
                    <td className="p-2 border">{new Date(o.createdAt).toLocaleDateString()}</td> 
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminReports;