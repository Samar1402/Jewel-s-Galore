const express = require("express");
const router = express.Router();
const { 
    createOrder, 
    getMyOrders, 
    getOrderRequests, 
    getOrderProcessing, 
    getOrderDispatch, 
    getOrderDelivered, 
    updateOrderStatus 
} = require("../Controllers/orderController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");


router.post("/", AuthMiddleware, createOrder);
router.get("/my-orders", AuthMiddleware, getMyOrders);

router.get("/requests", AuthMiddleware, getOrderRequests);             // Status: Pending
router.get("/processing", AuthMiddleware, getOrderProcessing);         // Status: Confirmed
router.get("/dispatch", AuthMiddleware, getOrderDispatch);             // Status: Dispatched
router.get("/delivered", AuthMiddleware, getOrderDelivered);           // Status: Delivered


router.put("/update-status/:id", AuthMiddleware, updateOrderStatus);

module.exports = router;