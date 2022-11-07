const Order = require('../models/Order');

class OrderController {
   handleShowAllOrder = async (req, res) => {
      try {
         const order = await Order.find({});

         let orders = {
            money: 0,
            count: 0,
         }

         for( let i =0; i < order.length; i++) {
            orders.money += order[i].moneyTotal;
            orders.count += order[i].quantityTotal;
         }

         res.json(orders);
      } catch (e) {
         res.status(500).json({ message: e.message });
      }
   };
}

module.exports = new OrderController();
