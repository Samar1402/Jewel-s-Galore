import React from "react";
import UserLayout from "../Layout/UserLayout";

const OrderHistory = () => {
  return (
    <UserLayout>
      <h1 className="text-2xl font-bold text-[#b8860b] mb-6">
        Order History
      </h1>

      <p>No orders found.</p>
    </UserLayout>
  );
};

export default OrderHistory;
