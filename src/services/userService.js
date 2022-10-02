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
				'Verify your email',
				`<h1>✅ Verify your email !</h1><p>💬 Your OTP: <b>${otp}</b></p><h4>Click this link to redirect verify page: </h4><p>Your OTP will be <b>expire in 15 minutes</b></p><h3>If you don't do this, don't do anything ❌❌❌</h3>`
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
			const { userId} = params;

			// check user id and otp input
			if (!userId || !otp) {
				return reject({
					message: 'User Id and OTP are required',
				});
			}
			const userOtp = await UserVerified.findOne({
				userId: userId,
			});

			// check user id is exist
			if (!userOtp) {
				return reject({
					message: "User Id doesn't exist",
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
