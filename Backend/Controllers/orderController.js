const Order = require("../Models/order");

exports.createOrder = async (req, res) => {
    try {
        const { items, totalAmount, deliveryAddress } = req.body;
        
        if (!items || items.length === 0 || !totalAmount) {
            return res.status(400).json({ success: false, message: "Missing order details" });
        }

        if (!deliveryAddress || !deliveryAddress.street) {
             return res.status(400).json({ success: false, message: "Delivery address is missing or incomplete." });
        }

        const order = new Order({
            user: req.user.id, 
            items,
            totalAmount,
            deliveryAddress, 
            status: 'Pending', 
        });

        await order.save();
        res.status(201).json({ success: true, message: "Order created successfully", order });

    } catch (err) {
        console.error("createOrder Error:", err);
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

// --- NEW/FIXED ADMIN ENDPOINTS ---

/**
 * Endpoint to fetch all orders for the admin reports component.
 * It populates the 'user' field to include the customer's name.
 */
exports.getAllOrdersForAdmin = async (req, res) => { 
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Admin access required" });
        }
        // ⭐ POPULATE USER: Ensure 'user' field is populated to get customer name for reports
        const orders = await Order.find({})
            .populate('user', 'name') // Only fetch the 'name' field from the User model
            .sort({ createdAt: -1 });
            
        res.json({ success: true, data: orders }); // Use 'data' to pass the array to the client
    } catch (err) {
        console.error("getAllOrdersForAdmin:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.updateOrderStatus = async (req, res) => { 
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Admin only" });
        }
        
        const { id } = req.params;
        const { status, deliveryBoyName, deliveryBoyContact } = req.body;
        
        if (!["Pending","Confirmed","Dispatched","Delivered","Rejected"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const updateData = { 
            status,
        };

        // ⭐ CONDITIONAL LOGIC FOR DELIVERY BOY DETAILS ⭐
        if (status === "Dispatched") {
            if (!deliveryBoyName || !deliveryBoyContact) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Delivery Boy Name and Contact are required to dispatch an order." 
                });
            }
            updateData.deliveryBoyName = deliveryBoyName;
            updateData.deliveryBoyContact = deliveryBoyContact;
        }

        // If the status is updated to anything else, clear the delivery boy info (optional, but clean)
        if (status !== "Dispatched" && status !== "Delivered") {
             updateData.deliveryBoyName = undefined;
             updateData.deliveryBoyContact = undefined;
        }


        // Mongoose automatically updates 'updatedAt' due to timestamps: true
        const order = await Order.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true }
        );

        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        
        res.json({ success: true, order });
    } catch (err) {
        console.error("updateOrderStatus:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Existing fetch-by-status functions (kept for completeness, assuming they are used elsewhere)
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