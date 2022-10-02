/** @format */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserVerified = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},
		otp: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			index: {
				expires: '15m',
			}
		},
		expireAt: {
			type: Date,
			default: Date.now() + (15 * 60 * 1000),
		}
	},
	{ collection: 'UserVerified' }
);

// hash otp
UserVerified.pre('save', async function () {
	const salt = await bcrypt.genSalt(10);
	this.otp = await bcrypt.hash(this.otp, salt);
});

module.exports = mongoose.model('UserVerified', UserVerified);
