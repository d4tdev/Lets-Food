const sendMail = require('../utils/sendMail');
const User = require('../models/User');
const UserVerified = require('../models/UserVerified');

class UserController {
   resetPassword = async (req, res) => {
      try {
         const { inputForgot } = req.body;

         if (inputForgot) {
            let user = await User.findOne({ email: inputForgot, authType: 'local' });
            console.log(typeof inputForgot);
            if (user.username) {
               await UserVerified.create({
                  userId: user._id,
                  otp: `https://letsfood.click/user/verify_reset_password/${user._id}`,
                  createAt: Date.now(),
               });

               await sendMail(
                  user.email,
                  'Quên mật khẩu',
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
            <div class="main" style="padding-left: 20px; padding-right: 20px; padding-top: 100px; padding-bottom: 100px;">
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
                        Hoàn tất quá trình quên mật khẩu
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
                           Bạn đã yêu cầu đặt lại mật khẩu của mình. Vui lòng nhấp vào nút bên dưới để đặt lại mật khẩu của bạn.:

                        </p>
                        <div class="button" style="margin-top: 40px">
                           <a
                              href="https://letsfood.click/user/verify_reset_password/${user._id}"
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
                        này. Đường dẫn này sẽ hết hạn sau 15 phút.
                     </p>
               </div>
            </div>
      </div></body>`
               );
               return res.render('getQuenMatKhau', {
                  message: 'Đã gửi một email tới hòm thư của bạn',
               });
            }

            user = await User.findOne({ username: inputForgot, authType: 'local' });
            if (user) {
               await UserVerified.create({
                  userId: user._id,
                  otp: `https://letsfood.click/user/verify_reset_password/${user._id}`,
                  createAt: Date.now(),
               });

               await sendMail(
                  user.email,
                  'Quên mật khẩu',
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
            <div class="main" style="padding-left: 20px; padding-right: 20px; padding-top: 100px; padding-bottom: 100px;">
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
                        Hoàn tất quá trình quên mật khẩu
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
                           Bạn đã yêu cầu đặt lại mật khẩu của mình. Vui lòng nhấp vào nút bên dưới để đặt lại mật khẩu của bạn.:

                        </p>
                        <div class="button" style="margin-top: 40px">
                           <a
                              href="https://letsfood.click/user/verify_reset_password/${user._id}"
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
                        này. Đường dẫn này sẽ hết hạn sau 15 phút.
                     </p>
               </div>
            </div>
      </div></body>`
               );
               return res.render('getQuenMatKhau', {
                  message: 'Đã gửi một email tới hòm thư của bạn',
               });
            }
         } else {
            return res.render('getQuenMatKhau', {
               message: 'Vui lòng nhập email hoặc tên đăng nhập',
            });
         }
      } catch (e) {
         return res.render('getQuenMatKhau', { message: 'Gửi mail thất bại' });
      }
   };

   verifyResetPassword = async (req, res) => {
      try {
         const { newPassword } = req.body;
         const { userId } = req.params;

         const user = await User.findById(userId);
         if (!user) {
            return res.status(403).json('User not found');
         }

         await User.updateOne({ _id: userId }, { password: newPassword });

         await UserVerified.deleteOne({ userId: userId });
         return res.status(200).json('Updated password successfully');
      } catch (e) {
         return res.status(500).json({ error: e });
      }
   };

   changePassword = async (req, res) => {
      try {
         let { oldPassword, newPassword } = req.body;
         const { userId } = req.params;

         if (!oldPassword || !newPassword) {
            return res.render('doiMatKhau', {
               user: req.user,
               message: 'Vui lòng nhập đầy đủ thông tin',
            });
         }

         const user = await User.findById(userId);
         if (!user) {
            return res.render('doiMatKhau', { user: req.user, message: 'Tài khoản không tồn tại' });
         }

         const isMatch = await user.validPassword(oldPassword);
         if (!isMatch) {
            return res.render('doiMatKhau', { user: req.user, message: 'Mật khẩu cũ không đúng' });
         }

         newPassword = await user.hashPassword(newPassword);
         await User.updateOne({ _id: userId }, { password: newPassword });

         return res.render('doiMatKhau', { user: req.user, message: 'Đổi mật khẩu thành công' });
      } catch (e) {
         return res.render('doiMatKhau', { user: req.user, message: 'Đổi mật khẩu thất bại' });
      }
   };

   getUserProfile = async (req, res) => {
      try {
         // const { userId } = req.params;

         // const user = await User.findById(userId);
         // if (!user) {
         //    return res.status(403).json('User not found');
         // }

         // return res.status(200).json(user);
         return res.render('thongTinNguoiDung', { user: req.user });
      } catch (e) {
         return res.render('thongTinNguoiDung', { message: 'No user found!!!', user: req.user });
      }
   };

   updateUserProfile = async (req, res) => {
      try {
         const { userId } = req.params;
         const { firstName, lastName, number, address } = req.body;

         const user = await User.findById(userId);
         if (!user) {
            return res.render('thongTinNguoiDung', { message: 'No user found!!!', user: req.user });
         }

         await User.updateOne(
            { _id: userId },
            { firstName: firstName, lastName: lastName, number: number, address: address }
         );

         return res.redirect('/user/show/' + userId);
      } catch (e) {
         return res.render('thongTinNguoiDung', {
            message: 'Update profile failed',
            user: req.user,
         });
      }
   };

   // get all users
   getAllUsers = async (req, res) => {
      try {
         const users = await User.find();
         return res.status(200).json(users);
      } catch (e) {
         return res.status(500).json({ error: e });
      }
   }
}

module.exports = new UserController();
