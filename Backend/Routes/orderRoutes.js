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

router.get("/requests", AuthMiddleware, getOrderRequests);             
router.get("/processing", AuthMiddleware, getOrderProcessing);         
router.get("/dispatch", AuthMiddleware, getOrderDispatch);             
router.get("/delivered", AuthMiddleware, getOrderDelivered);           


router.put("/update-status/:id", AuthMiddleware, updateOrderStatus);

module.exports = router;