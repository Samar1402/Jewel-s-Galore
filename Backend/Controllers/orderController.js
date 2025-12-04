const Order = require("../Models/order"); 
const User = require("../Models/user"); 

exports.createOrder = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ 
                success: false, 
                message: "Authentication failed. User session data is missing." 
            });
        }

        const newOrder = new Order({
            user: req.user._id, 
            items: req.body.items,
            deliveryAddress: req.body.deliveryAddress,
            totalAmount: req.body.totalAmount,
            status: "Pending" 
        });
        await newOrder.save();
        res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: error.message || "Failed to create order" });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders." });
    }
};

exports.getAllOrdersForAdmin = async (req, res) => { 
    try {
        const orders = await Order.find({})
            .populate('user', 'name') 
            .sort({ createdAt: -1 });
            
        res.json({ success: true, data: orders }); 
    } catch (err) {
        console.error("getAllOrdersForAdmin Database Error:", err.message);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch orders due to a database error." 
        });
    }
};

exports.getOrderRequests = async (req, res) => {
    try {
        const orders = await Order.find({ status: "Pending" }).populate('user', 'name').sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch pending orders." });
    }
};

exports.getOrderProcessing = async (req, res) => {
    try {
        const orders = await Order.find({ status: "Confirmed" }).populate('user', 'name').sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch confirmed orders." });
    }
};

exports.getOrderDispatch = async (req, res) => {
    try {
        const orders = await Order.find({ status: "Dispatched" }).populate('user', 'name').sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch dispatched orders." });
    }
};

exports.getOrderDelivered = async (req, res) => {
    try {
        const orders = await Order.find({ status: "Delivered" }).populate('user', 'name').sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch delivered orders." });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status: newStatus, deliveryBoyName, deliveryBoyContact } = req.body;
        
        const updateFields = { status: newStatus };
        
        if (newStatus === "Dispatched" || newStatus === "Confirmed") {
            updateFields.deliveryBoyName = deliveryBoyName || null;
            updateFields.deliveryBoyContact = deliveryBoyContact || null;
        }

        const order = await Order.findByIdAndUpdate(
            orderId, 
            updateFields, 
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }
        
        res.json({ success: true, message: `Status updated to ${newStatus}`, data: order });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ success: false, message: "Failed to update status." });
    }
};