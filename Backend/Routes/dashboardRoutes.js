const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../Controllers/dashboardController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware"); 
const AdminMiddleware = require("../Middlewares/AdminMiddleware"); 

router.get("/order-stats", AuthMiddleware, AdminMiddleware, getDashboardStats);

module.exports = router;