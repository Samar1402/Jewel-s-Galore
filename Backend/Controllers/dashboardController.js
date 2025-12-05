const Order = require('../Models/order'); 

const getDashboardStats = async (req, res) => {
    try {
        const pipeline = [
            { 
                $addFields: { 
                    statusUpper: { $toUpper: "$status" },
                    totalAmountNumeric: { 
                        $ifNull: [
                            { $toDecimal: "$totalAmount" }, 
                            0
                        ]
                    }
                } 
            },
            
            {
                $match: {
                    statusUpper: { $ne: 'REJECTED' } 
                }
            },

            {
                $group: {
                    _id: "$statusUpper",
                    count: { $sum: 1 },
                    revenue: { $sum: "$totalAmountNumeric" } 
                }
            },

            {
                $group: {
                    _id: null,
                    totalOrdersActive: { $sum: "$count" }, 
                    overallRevenue: { $sum: "$revenue" },
                    pending: { $sum: { $cond: [ { $eq: ["$_id", "PENDING"] }, "$count", 0 ] } },
                    confirmed: { $sum: { $cond: [ { $eq: ["$_id", "CONFIRMED"] }, "$count", 0 ] } },
                    dispatched: { $sum: { $cond: [ { $eq: ["$_id", "DISPATCHED"] }, "$count", 0 ] } },
                    delivered: { $sum: { $cond: [ { $eq: ["$_id", "DELIVERED"] }, "$count", 0 ] } },
                    deliveredRevenue: { $sum: { $cond: [ { $eq: ["$_id", "DELIVERED"] }, "$revenue", 0 ] } },
                    processingRevenue: { 
                        $sum: { 
                            $cond: [ 
                                { $in: ["$_id", ["CONFIRMED", "DISPATCHED"]] }, 
                                "$revenue", 
                                0 
                            ] 
                        } 
                    },
                }
            },

            { 
                $project: { 
                    _id: 0,
                    totalOrders: "$pending", 
                    confirmed: 1, 
                    dispatched: 1, 
                    delivered: 1, 
                    overallRevenue: { $toDouble: "$overallRevenue" }, 
                    deliveredRevenue: { $toDouble: "$deliveredRevenue" }, 
                    processingRevenue: { $toDouble: "$processingRevenue" } 
                } 
            }
        ];

        const stats = await Order.aggregate(pipeline);

        if (stats.length > 0) {
            return res.json({ ok: true, data: stats[0] });
        } else {
            const zeroStats = { totalOrders: 0, confirmed: 0, dispatched: 0, delivered: 0, overallRevenue: 0, deliveredRevenue: 0, processingRevenue: 0 };
            return res.json({ ok: true, data: zeroStats });
        }
    } catch (error) {
        console.error("Error in getDashboardStats:", error);
        res.status(500).json({ ok: false, message: "Server error fetching dashboard stats" });
    }
};

module.exports = { getDashboardStats };