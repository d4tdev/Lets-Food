const Cart = require('../models/Cart');
const Product = require('../models/Product');
const CartProduct = require('../models/CartProduct');
const User = require('../models/User');
const Order = require('../models/Order');
const sendEmail = require('../utils/sendMail');

const createCart = (productId, userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         // product require
         if (!productId) {
            return reject('Product id is required');
         }
         // user require
         if (!userId) {
            return reject('User id is required');
         }
         const product = await Product.findById(productId);
         if (!product) {
            return reject('Product not found');
         }
         const user = await User.findById(userId);
         if (!user) {
            return reject('User not found');
         }
         let cart = await Cart.findOne({ userId: userId });
         if (!cart) {
            const newCartProduct = await CartProduct.create({
               productId: productId,
               userId: userId,
            });
            const newCart = await Cart.create({ userId: userId, count: 1 });
            await newCart.updateOne({ $push: { products: newCartProduct._id } });

            return resolve({ newCart, msg: 'Cart created' });
         } else {
            let cartProduct = await CartProduct.findOne({
               productId: productId,
               userId: userId,
            });
            if (!cartProduct) {
               const newCartProduct = await CartProduct.create({
                  productId: productId,
                  userId: userId,
               });
               await cart.updateOne({
                  $push: { products: newCartProduct._id },
                  count: cart.count + 1,
               });
               return resolve({ msg: 'Product added to cart' });
            } else {
               let newQuantity = +cartProduct.quantity + 1;
               await cartProduct.updateOne({ quantity: newQuantity });
               return resolve({ msg: 'Product quantity updated' });
            }
         }
      } catch (e) {
         reject(e);
      }
   });
};

const getCart = userId => {
   return new Promise(async (resolve, reject) => {
      try {
         const cart = await Cart.findOne({ userId: userId }).populate({
            path: 'products',
            populate: { path: 'productId' },
         });

         if (!cart) {
            return reject({ msg: 'Cart not found' });
         }

         return resolve(cart);
      } catch (e) {
         return reject(e);
      }
   });
};

const updateQuantity = (productId, userId, quantity) => {
   return new Promise(async (resolve, reject) => {
      try {
         const cartProduct = await CartProduct.findOne({
            productId: productId,
            userId: userId,
         });
         if (!cartProduct) {
            return reject('Product not found');
         }
         await cartProduct.updateOne({ quantity: quantity });
         return resolve({ msg: 'Product quantity updated' });
      } catch (e) {
         return reject(e);
      }
   });
};
const updateQuantityPlus = (productId, userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         const cartProduct = await CartProduct.findOne({
            productId: productId,
            userId: userId,
         });
         if (!cartProduct) {
            return reject('Product not found');
         }

         let newQuantity = cartProduct.quantity + 1;
         await cartProduct.updateOne({ quantity: newQuantity });
         return resolve({ msg: 'Product quantity updated' });
      } catch (e) {
         return reject(e);
      }
   });
};

const updateQuantityMinus = (productId, userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         const cartProduct = await CartProduct.findOne({
            productId: productId,
            userId: userId,
         });
         if (!cartProduct) {
            return reject('Product not found');
         }
         let newQuantity = cartProduct.quantity - 1;
         await cartProduct.updateOne({ quantity: newQuantity });
         return resolve({ msg: 'Product quantity updated' });
      } catch (e) {
         return reject(e);
      }
   });
};

const deleteOneCartProduct = (productId, userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         const cartProduct = await CartProduct.findOne({
            productId: productId,
            userId: userId,
         });
         if (!cartProduct) {
            return reject('Product not found');
         }
         await cartProduct.deleteOne();

         // tìm thằng cart của user đó
         let cart = await Cart.findOne({ userId: userId });
         await Cart.updateOne({ count: cart.count - 1 });
         return resolve({ msg: 'Product in cart deleted' });
      } catch (e) {
         return reject(e);
      }
   });
};

const deleteAllCartProduct = userId => {
   return new Promise(async (resolve, reject) => {
      try {
         const cart = await Cart.findOne({ userId: userId });
         if (!cart) {
            return reject('Cart not found');
         }
         await cart.deleteOne();
         return resolve({ msg: 'Cart deleted' });
      } catch (e) {
         return reject(e);
      }
   });
};

const checkOut = (user, note) => {
   return new Promise(async (resolve, reject) => {
      try {
         const cart = await Cart.findOne({ userId: user._id });

         if (!cart) {
            return reject('Cart not found');
         }

         if (!user.number) {
            return reject('User number not found');
         }
         if (!user.address) {
            return reject('User address not found');
         }

         const cartProducts = await CartProduct.find({ userId: user._id });
         if (!cartProducts) {
            return reject('Cart product not found');
         }

         const sendOtp = await sendOtpVerification(user, note);

         if (sendOtp) {
            return resolve({ msg: 'Send otp success' });
         } else {
            return reject('Send otp fail');
         }
      } catch (e) {
         reject(e);
      }
   });
};

const sendOtpVerification = (user, note) => {
   return new Promise(async (resolve, reject) => {
      try {
         const cart = await Cart.findOne({ userId: user._id });

         const order = await Order.create({
            userId: user._id,
            products: cart.products,
            note: note,
            number: user.number,
            address: user.address,
            status: 'shipping',
         });

         await CartProduct.deleteMany({ userId: user._id });
         await Cart.deleteOne({ userId: user._id });

         await sendEmail(
            user.email,
            `Đây là xác nhận đơn đặt hàng của bạn`,
            `
               <body style="padding: 0; margin: 0;">
                  <div
                  class="root"
                  style="
                        background-color: #ffac4b;
                        min-height: 80vh;
                        min-width: 76vw;
                        font-family: 'Readex Pro', sans-serif;
                  ">
                  <div class="main" style="padding-left: 20px; padding-right: 20px; padding-top: 100px;padding-bottom: 100px;">
                        <div
                           class="container"
                           style="
                           max-width: 500px;
                           max-height: 500px;
                           background-color: #fff9ea;
                           border-radius: 12px;
                           padding: 20px;
                           text-align: center;
                           margin-left: auto;
                           margin-right: auto;
                           ">
                           <div
                              class="logo"
                              style="
                                    margin: 0 auto;
                                    margin-bottom: 10px;
                              ">
                              <img src="cid:logo" alt="logo" class="img__logo" />
                           </div>
                           <h2
                              class="title"
                              style="
                                    font-size: 1.8rem;
                                    font-weight: 700;
                                    color: #1b1b1b;
                                    margin-bottom: 20px;
                              ">
                              Cảm ơn đã tin tưởng và đặt hàng bên chúng tôi
                           </h2>
                           <div
                              class="line"
                              style="
                                    width: 100%;
                                    height: 1px;
                                    background-color: #1b1b1b;
                                    margin-bottom: 20px;
                           "></div>
                           <div class="content" style="margin: 40px 0">
                              <h5
                                    class="welcome"
                                    style="
                                       font-size: 1.2rem;
                                       font-weight: 400;
                                       color: #1b1b1b;
                                       margin-bottom: 20px;
                                    ">
                                    Xin chào bạn,

                              </h5>
                              <p
                                    class="description"
                                    style="
                                       font-size: 1rem;
                                       font-weight: 400;
                                       color: #1b1b1b;
                                       margin-bottom: 20px;
                                    ">
                                    Bạn đã đặt hàng thành công, đơn hàng của bạn đang được vận chuyển đến địa chỉ:
                                    <span
                                       class="otp"
                                       style="
                                          font-size: 1.2rem;
                                          font-weight: 700;
                                          color: #1b1b1b;
                                          margin-bottom: 20px;
                                       "
                                       >${order.address}</span
                                    >.
                              </p>
                           </div>
                           <div
                              class="line"
                              style="
                                    width: 100%;
                                    height: 1px;
                                    background-color: #1b1b1b;
                                    margin-bottom: 20px;
                              "></div>
                              <p
                              class="footer"
                              style="
                                    font-size: 1rem;
                                    font-weight: 400;
                                    color: #1b1b1b;
                                    margin-top: 20px;
                              ">
                              Vui lòng thanh toán khi có bên giao hàng gọi cho bạn qua số điện thoại: <span style="font-weight: 600;">${order.number}</span>
                           </p>
                           <p style="
                           font-size: 1rem;
                           font-weight: 400;
                           color: #1b1b1b;
                           margin-top: 20px;
                           ">Ghi chú của bạn: <b>${order.note}</b></p>
                        </div>
                     </div>
                  </div>
               </body>`
         );

         resolve({
            status: 'PENDING',
            message: 'Verify your email by otp',
            data: {
               userId: user._id,
               email: user.email,
            },
         });
      } catch (e) {
         reject('Error', e);
      }
   });
};

module.exports = {
   createCart,
   getCart,
   updateQuantity,
   updateQuantityPlus,
   updateQuantityMinus,
   deleteOneCartProduct,
   deleteAllCartProduct,
   sendOtpVerification,
   checkOut,
};
