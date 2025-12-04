import React from "react";
import AdminLayout from "./AdminLayout"; 
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const salesData = [
  { name: "Jan", sales: 12000, orders: 80 },
  { name: "Feb", sales: 15000, orders: 100 },
  { name: "Mar", sales: 18000, orders: 130 },
  { name: "Apr", sales: 17000, orders: 120 },
  { name: "May", sales: 22000, orders: 150 },
  { name: "Jun", sales: 26000, orders: 180 },
];

const orderStatusData = [
  { name: "Completed", value: 70 },
  { name: "Pending", value: 20 },
  { name: "Cancelled", value: 10 },
];

const paymentData = [
  { name: "UPI", value: 55 },
  { name: "Card", value: 25 },
  { name: "COD", value: 20 },
];

const COLORS = ["#10B981", "#3B82F6", "#EF4444", "#F59E0B"];

const AnalyticsPage = () => {
  return (
    <AdminLayout>
      <div className="p-4 space-y-6">

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500">Total Sales</h2>
            <p className="text-2xl font-semibold text-green-600">₹1,05,000</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500">Total Orders</h2>
            <p className="text-2xl font-semibold">760</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500">Returning Customers</h2>
            <p className="text-2xl font-semibold text-blue-600">42%</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500">Avg Order Value</h2>
            <p className="text-2xl font-semibold text-purple-600">₹1380</p>
          </div>
        </div>

        {/* SALES LINE CHART */}
        <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <div className="min-w-[600px]">
            <LineChart width={900} height={300} data={salesData}>
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
        </div>

        {/* ORDERS BAR CHART */}
        <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Orders Per Month</h3>
          <div className="min-w-[600px]">
            <BarChart width={900} height={300} data={salesData}>
              <Bar dataKey="orders" fill="#10B981" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </div>
        </div>

        {/* PIE CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Order Status</h3>
            <PieChart width={350} height={280}>
              <Pie data={orderStatusData} dataKey="value" nameKey="name" outerRadius={100} label>
                {orderStatusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <PieChart width={350} height={280}>
              <Pie data={paymentData} dataKey="value" nameKey="name" outerRadius={100} label>
                {paymentData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
