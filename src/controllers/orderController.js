const Order = require('../models/Order');
const Cart = require('../models/Cart');

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

   // hiển thị đơn hàng theo id user
   handleShowOrderById = async (req, res) => {
      try {
         const order = await Order.find({ userId: req.params.id }).populate({
            path: 'products',
            populate: { path: 'productId' },
         });

         let orders = {
            count : 0,
            money: 0,
            orderUser: [],
         }

         // lấy số lượng đơn hàng
         for( let i =0; i < order.length; i++) {
            orders.count += 1;
         }

         // nếu có 1 đơn hàng trở lên thì push từng đơn hàng vào mảng orderUser
         if(orders.count > 0) {
            for( let i =0; i < order.length; i++) {
               orders.orderUser.push(order[i]);
            }
         }

         // tính tổng tiền
         for( let i =0; i < order.length; i++) {
            orders.money += order[i].moneyTotal;
         }

         res.render('donHang', { orders, user: req.user });
         // res.json(order)
      } catch (e) {
         res.status(500).json({ message: e.message });
      }
   }

   // hiện thị sản phẩm bán chạy nhất
   handleShowProductBestSell = async (req, res) => {
      try {
         const order = await Order.find({}).populate({
            path: 'products',
            populate: { path: 'productId' },
         });

         let products = [];

         // lấy ra các sản phẩm bán được kèm số lượng
         for( let i =0; i < order.length; i++) {
            for( let j = 0; j < order[i].products.length; j++) {
               products.push(order[i].products[j]);
            }
         }

         // sắp xếp sản phẩm theo số lượng bán được
         products.sort((a, b) => {
            return b.quantity - a.quantity;
         });

         // lấy ra 5 sản phẩm bán chạy nhất
         let productsBestSell = [];
         for( let i = 0; i < 5; i++) {
            productsBestSell.push(products[i]);
         }

         return res.json({productsBestSell});
         // res.render('Admin', { productsBestSell, user: req.user });
      } catch (e) {
         res.status(500).json({ message: e.message });
      }
   }
}

module.exports = new OrderController();
