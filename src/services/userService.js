const bcrypt = require('bcryptjs');

const User = require('../model/User');
const UserVerified = require('../model/UserVerified');
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
				return resolve(sendOtp);
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
				`<h1>✅ Hãy xác nhận tài khoản của bạn !</h1>
				<img src="cid:logo" alt="" /><p style="font-size: 1rem; font-weight: 500;">💬 Mã OTP: <b>${otp}</b></p><h4>Ấn vào đường dẫn này để chuyển sang trang xác nhận: </h4><p>Mã OTP của bạn sẽ bị <b>huỷ sau 15 phút</b>. Nếu không phải bạn làm điều này, vui lòng không làm gì cả</p>`
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
				return resolve(sendOtp);
			}
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = { sendOtpVerification, createUser, verifyUser, resendOTP };
