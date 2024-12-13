const { User, Order } = require('../models/sequlize');
const Product = require('../models/mongoose/product');
const product = require('../models/mongoose/product');
const product = require('../models/mongoose/product');

async function createOrder(req, res) {
    const {userId, orderItems } = req.body;
    try{
        const user = await User.findByPK(userId);
        if(!user){
            return res.status(404).send('User Not found');
        }

        const productIds = orderItems.map(item=> item.productId);
        const products = await Product.find({_id: { $in : productIds}});

        if(products.length !== orderItems.length){
            return res.status(400).send('Invalid product in order');
        }
        let totalValue = 0;
        const detailOrderItems = orderItems.map((item) => {
            const product = product.find(p => p._id.toString() === item.productId);
            totalValue += product.price * item.quantity;
            return {...item, price:product.price, name:product.name};
        });

        const order = await Order.create({
            userId,
            totalValue,
            items: detailOrderItems,
        });

        res.status(200).json({orderId:order.id,
            totalValue, items:detailOrderItems
        });

    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error')
    }
}

async function getUserOrders(req, res) {
    const { userId} = req.params;

    try{
        const orders = await Order.findAll({where: {userId}});
        if(!orders.length){
            return res.status(404).send('No oreders found');
        }
        res.json(orders);
    }catch(error){
        console.log(error);
        res.status(500).send('Internal server Error');
    }
};

//sales report
async function getSalesReport(req, res) {
    try{
        const salesReport = await Product.aggregate([
            {
                $lookup: {
                    from: 'orders',
                    localField: '_id',
                    foreignField:'items.productId',
                    as:'orders'
                },
            },
            { $unwind: '$orders'},
            {$unwind: '$orders.items'},
            {
                $group: {
                    _id: '$_id',
                    productName:{ $first: '$name'},
                    totalSales: { $sum: {
                        $multiply:['$orders.items.price', '$orders.items.quantity']
                    }}
                }
            },
            { $project: {_id:0,productName:1,totalSales:1}}
        ]);

        res.status(200).json(salesReport);
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    createOrder,
    getUserOrders,
    getSalesReport
};