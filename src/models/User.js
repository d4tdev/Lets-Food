const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
	{
		googleId: {
			type: String,
		},
		facebookId: {
			type: String,
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
			type: String
		},
		address: {
			type: String
		},
		birthday: {
			type: Date
		},
		avatar: {
			type: String,
			default: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'
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
				'product email must be provided',
			],
		},
		password: {
			type: String,
			// required: true,
			minLength: 6,
		},
		verified: {
			type: Boolean,
			default: false,
		},
	},
	{ collection: 'User' }
);

// hash password
if (this.password) {
	UserSchema.pre('save', async function () {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	});
}

// check valid password
UserSchema.methods.validPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
