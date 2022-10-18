const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const UserSchema = new mongoose.Schema(
	{
		googleId: {
			type: String,
			default: null
		},
		facebookId: {
			type: String,
			default: null
		},
		firstName: {
			type: String,
			default: 'Người',
		},
		lastName: {
			type: String,
			default: 'Dùng',
		},
		number: {
			type: String,
		},
		address: {
			type: String,
		},
		birthday: {
			type: Date,
		},
		avatar: {
			type: String,
			default: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png',
		},
		username: {
			type: String,
			// required: true,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Email không hợp lệ',
			],
		},
		password: {
			type: String,
			// required: true,
			minLength: [6, 'Mật khẩu tối thiểu 6 ký tự'],
		},
		authType: {
			type: String,
			enum: ['local', 'google', 'facebook', 'twitter', 'github'],
			default: 'local',
		},
		verified: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		}
	},
	{ collection: 'User' }
);

// hash password

UserSchema.pre('save', async function () {
	if(this.authType !== 'local') return;

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// check valid password
UserSchema.methods.validPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// hash password
UserSchema.methods.hashPassword = async function (password) {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

// generate token
UserSchema.methods.generateToken = async function () {
	return await jwt.sign(
		{
			userId: this._id,
			iat: new Date().getTime(),
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRE,
		}
	);
};

module.exports = mongoose.model('User', UserSchema);
