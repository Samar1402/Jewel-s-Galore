const express = require("express");
const router = express.Router();
const { 
    createOrder, 
    getMyOrders, 
    getAllOrdersForAdmin, 
    getOrderRequests, 
    getOrderProcessing, 
    getOrderDispatch, 
    getOrderDelivered, 
    updateOrderStatus 
} = require("../Controllers/orderController"); 

const AuthMiddleware = require("../Middlewares/AuthMiddleware");
const AdminMiddleware = require("../Middlewares/AdminMiddleware"); 


router.post("/", AuthMiddleware, createOrder); 
router.get("/my-orders", AuthMiddleware, getMyOrders);

router.get("/admin", AuthMiddleware, AdminMiddleware, getAllOrdersForAdmin);

router.get("/requests", AuthMiddleware, AdminMiddleware, getOrderRequests);             
router.get("/processing", AuthMiddleware, AdminMiddleware, getOrderProcessing);         
router.get("/dispatch", AuthMiddleware, AdminMiddleware, getOrderDispatch);             
router.get("/delivered", AuthMiddleware, AdminMiddleware, getOrderDelivered);           

router.put("/update-status/:id", AuthMiddleware, AdminMiddleware, updateOrderStatus);

module.exports = router;