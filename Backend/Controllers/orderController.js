const Order = require("../Models/order");

exports.createOrder = async (req, res) => {
    try {
        // 🛑 CRITICAL FIX: Extract 'deliveryAddress' along with other fields
        const { items, totalAmount, deliveryAddress } = req.body;
        
        if (!items || items.length === 0 || !totalAmount) {
            return res.status(400).json({ success: false, message: "Missing order details" });
        }

        // Mongoose will perform this check, but this explicit check helps catch client-side errors early.
        if (!deliveryAddress || !deliveryAddress.street) {
             return res.status(400).json({ success: false, message: "Delivery address is missing or incomplete." });
        }


        const order = new Order({
            user: req.user.id, 
            items,
            totalAmount,
            // ✅ PASS THE ADDRESS OBJECT TO THE SCHEMA
            deliveryAddress, 
            status: 'Pending', 
        });

        await order.save();
        res.status(201).json({ success: true, message: "Order created successfully", order });

    } catch (err) {
        console.error("createOrder Error:", err);
        // Return the error message to help debug any new validation failures
        res.status(500).json({ success: false, message: "Failed to create order: " + err.message });
    }
};

exports.getMyOrders = async (req, res) => { 
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (err) {
        console.error("getMyOrders:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};


const fetchOrdersByStatus = async (req, res, status) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Admin access required" });
        }
        const orders = await Order.find({ status: status }).sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (err) {
        console.error(`fetchOrdersByStatus (${status}):`, err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getOrderRequests = (req, res) => fetchOrdersByStatus(req, res, "Pending");

exports.getOrderProcessing = (req, res) => fetchOrdersByStatus(req, res, "Confirmed");

exports.getOrderDispatch = (req, res) => fetchOrdersByStatus(req, res, "Dispatched");

exports.getOrderDelivered = (req, res) => fetchOrdersByStatus(req, res, "Delivered");


exports.updateOrderStatus = async (req, res) => { 
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Admin only" });
        }
        const { id } = req.params;
        const { status } = req.body;
        if (!["Pending","Confirmed","Dispatched","Delivered","Rejected"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        res.json({ success: true, order });
    } catch (err) {
        console.error("updateOrderStatus:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};