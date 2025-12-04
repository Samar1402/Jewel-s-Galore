const mongoose = require("mongoose");

// Define the nested schema for the Delivery Address structure
const deliveryAddressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true },
}, { _id: false }); 

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: false }
      },
    ],
    
    deliveryAddress: {
        type: deliveryAddressSchema,
        required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    // NEW FIELDS ADDED HERE
    deliveryBoyName: {
        type: String,
        required: false, 
    },
    deliveryBoyContact: {
        type: String,
        required: false,
    },
    // END NEW FIELDS

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Dispatched", "Delivered", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);