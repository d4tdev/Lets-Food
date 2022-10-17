const bcrypt = require('bcryptjs');

const User = require('../models/User');
const UserVerified = require('../models/UserVerified');
const sendEmail = require('../utils/sendMail');

const createUser = data => {
   return new Promise(async (resolve, reject) => {
      try {
         const { username, password, email } = data;
         if (!username || !password || !email) {
            return reject({
               message: 'Username and password are required',
            });
         }
         const isExist = await User.findOne({
            username: username,
         });
         if (isExist) {
            return reject({
               message: 'Username already exists',
            });
         }
         const newUser = await User.create({
            username: username,
            password: password,
            email: email,
         });

         const sendOtp = await sendOtpVerification(newUser);
         if (sendOtp) {
            return resolve(newUser);
         }
      } catch (e) {
         reject(e);
      }
   });
};

const sendOtpVerification = user => {
   return new Promise(async (resolve, reject) => {
      try {
         const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

         await UserVerified.create({
            userId: user._id,
            otp: otp,
            createAt: Date.now(),
         });

         await sendEmail(
            user.email,
            `${otp} là mã xác nhận của bạn`,
            `
               <body style="padding: 0; margin: 0;">
                  <div
                  class="root"
                  style="
                        background-color: #ffac4b;
                        min-height: 80vh;
                        width: 76vw;
                        font-family: 'Readex Pro', sans-serif;
                  ">
                  <div class="main" style="padding-left: 20px; padding-right: 20px; padding-top: 100px;">
                        <div
                           class="container"
                           style="
                           max-width: 500px;
                           height: 500px;
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
                              Hoàn tất quá trình đăng ký
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
                                    Đây là mã OTP của bạn:
                                    <span
                                       class="otp"
                                       style="
                                          font-size: 1.2rem;
                                          font-weight: 700;
                                          color: #1b1b1b;
                                          margin-bottom: 20px;
                                       "
                                       >${otp}</span
                                    >. Vui lòng nhập mã này để hoàn tất quá trình đăng
                                    ký.
                              </p>
                              <div class="button" style="margin-top: 40px">
                                    <a
                                       href="https://api-lets-food.cleverapps.io/auth/getVerifyOTP/${user._id}"
                                       class="btn"
                                       style="
                                          padding: 10px 20px;
                                          background-color: #ffcb45;
                                          border: none;
                                          border-radius: 20px;
                                          font-size: 1rem;
                                          font-weight: 700;
                                          color: #1b1b1b;
                                          cursor: pointer;
                                       "
                                       >Chuyển đến trang xác nhận</a
                                    >
                              </div>
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
                                    font-size: 0.8rem;
                                    font-weight: 400;
                                    color: #1b1b1b;
                                    margin-top: 20px;
                              ">
                              Nếu bạn không thực hiện đăng ký, vui lòng bỏ qua email
                              này. Mã OTP sẽ hết hạn sau 15 phút.
                           </p>
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

const verifyUser = (body, params) => {
   return new Promise(async (resolve, reject) => {
      try {
         const { otp } = body;
         const { userId } = params;

         // check user id and otp input
         if (!userId || !otp) {
            return reject({
               message: 'User Id and OTP are required',
            });
         }
         const user = await User.findOne({ userId });
         const userOtp = await UserVerified.findOne({
            userId: userId,
         });

         // check user id is exist
         if (!user) {
            return reject({
               message: "User Id doesn't exist",
            });
         }

         if (!userOtp) {
            return reject({
               message: 'OTP is not exist',
            });
         }

         // check otp is expired
         if (userOtp.expireAt < Date.now()) {
            await UserVerified.deleteMany({ userId });
            return reject({
               message: 'OTP is expired',
            });
         }

         // verify otp
         const validOTP = await bcrypt.compare(otp, userOtp.otp);
         if (!validOTP) {
            return reject({
               message: 'OTP is invalid',
            });
         }

         await UserVerified.deleteMany({
            userId: userId,
         });
         await User.updateOne(
            {
               _id: userId,
            },
            {
               verified: true,
            }
         );
         resolve({
            status: 'SUCCESS',
            message: 'Verify success',
         });
      } catch (e) {
         reject(e);
      }
   });
};

const resendOTP = params => {
   return new Promise(async (resolve, reject) => {
      try {
         const { userId } = params;

         // check user id input
         if (!userId) {
            return reject({
               message: 'User Id is required',
            });
         }
         const user = await User.findOne({
            _id: userId,
         });

         // check user id is exist
         if (!user) {
            return reject({
               message: "User Id doesn't exist",
            });
         }

         await UserVerified.deleteMany({
            userId: userId,
         });
         const sendOtp = await sendOtpVerification(user);
         if (sendOtp) {
            return resolve(user);
         }
      } catch (e) {
         reject(e);
      }
   });
};

const getOTPPage = params => {
   return new Promise(async (resolve, reject) => {
      try {
         const { userId } = params;
         if (!userId) {
            return reject({
               message: 'User Id is required',
            });
         }
         const user = await User.findOne({
            _id: userId,
         });
         resolve(user);
      } catch (e) {
         reject(e);
      }
   });
};

module.exports = { sendOtpVerification, createUser, verifyUser, resendOTP, getOTPPage };
