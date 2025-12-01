const Order = require('../Models/order'); 


const getDashboardStats = async (req, res) => {
    try {
        const pipeline = [
            { 
                $addFields: { 
                    totalAmountNumeric: { $toDouble: "$totalAmount" } 
                } 
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    revenue: { $sum: "$totalAmountNumeric" } 
                }
            },

            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: "$count" },
                    overallRevenue: { $sum: "$revenue" },
                    confirmed: { $sum: { $cond: [ { $eq: ["$_id", "Confirmed"] }, "$count", 0 ] } },
                    dispatched: { $sum: { $cond: [ { $eq: ["$_id", "Dispatched"] }, "$count", 0 ] } },
                    delivered: { $sum: { $cond: [ { $eq: ["$_id", "Delivered"] }, "$count", 0 ] } },
                    deliveredRevenue: { $sum: { $cond: [ { $eq: ["$_id", "Delivered"] }, "$revenue", 0 ] } },
                    processingRevenue: { $sum: { $cond: [ { $in: ["$_id", ["Confirmed", "Processing"]] }, "$revenue", 0 ] } },
                }
            },

            { 
                $project: { 
                    _id: 0, 
                    totalOrders: 1, 
                    confirmed: 1, 
                    dispatched: 1, 
                    delivered: 1, 
                    overallRevenue: 1, 
                    deliveredRevenue: 1, 
                    processingRevenue: 1 
                } 
            }
        ];

        const stats = await Order.aggregate(pipeline);

        if (stats.length > 0) {
            return res.json({ ok: true, data: stats[0] });
        } else {
            return res.json({ 
                ok: true, 
                data: { totalOrders: 0, confirmed: 0, dispatched: 0, delivered: 0, overallRevenue: 0, deliveredRevenue: 0, processingRevenue: 0 } 
            });
        }
    } catch (error) {
        console.error("Error in getDashboardStats:", error);
        res.status(500).json({ ok: false, message: "Server error fetching dashboard stats" });
    }
};

module.exports = { getDashboardStats };