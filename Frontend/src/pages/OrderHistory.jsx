import React from "react";
import UserLayout from "../Layout/UserLayout";

const OrderHistory = () => {
  // Sample orders array for demo. Replace with real data from backend.
  const orders = [
    // Uncomment and replace with real order data
    // {
    //   id: "ORD12345",
    //   date: "2025-11-15",
    //   items: [
    //     { name: "Gold Necklace", quantity: 1, price: 4999 },
    //     { name: "Diamond Ring", quantity: 2, price: 9999 }
    //   ],
    //   total: 24997
    // }
  ];

  return (
    <UserLayout>
      <div className="w-full">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg md:text-xl text-gray-600">
              You have no orders yet.
            </p>
            <p className="text-[#b8860b] mt-4">
              Start shopping and add some precious jewelry to your collection!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-[#b8860b] hover:shadow-2xl transition"
              >
                <h2 className="text-xl font-semibold text-[#b8860b] mb-2">
                  Order #{order.id}
                </h2>
                <p className="text-gray-500 mb-4">Date: {order.date}</p>

                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-gray-200 pb-2"
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-600">
                        {item.quantity} × ₹{item.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center font-bold text-[#b8860b] text-lg">
                  <span>Total:</span>
                  <span>₹{order.total}</span>
                </div>

                <button className="mt-4 w-full bg-[#b8860b] text-white py-2 rounded-lg font-medium hover:bg-[#d4af37] transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default OrderHistory;
