const User = require('../models/User');
const userService = require('../services/authService');

class AuthController {
   handleCreateUser = async (req, res) => {
      try {
         const user = await userService.createUser(req.body);
         // return res.status(200).json(user);
         return res.render('sendMail', { user });
      } catch (e) {
         return res.render('dangKy', { message: e.message });
      }
   };

   handleVerifyUser = async (req, res) => {
      try {

         const response = await userService.verifyUser(req.body, req.params);
         // return res.status(200).json(user);
         if (response) {
            return res.redirect('/auth/getLoginLocal');
         } else {
            return res.render('otp', { message: response });
         }
      } catch (e) {
         const user = await User.findOne({ _id: req.params.userId });
         return res.render('otp', { user, message: e.message });
      }
   };

   handleResendOTP = async (req, res) => {
      try {
         const user = await userService.resendOTP(req.params);
         // return res.status(200).json(user);
         return res.render('sendMail', { user });
      } catch (e) {
         const user = await User.findOne({ _id: req.params.userId });
         return res.render('sendMail', { user, message: e.message });
      }
   };

   handleGetOTPPage = async (req, res) => {
      try {
         const user = await userService.getOTPPage(req.params);
         return res.render('otp', { user, message: '' });
      } catch (e) {
         const user = await User.findOne({ _id: req.params.userId });
         return res.render('otp', { user, message: e.message });
      }
   };
}

module.exports = new AuthController();
