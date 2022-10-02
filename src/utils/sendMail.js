const path = require('path');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports = async (email, subject, html) => {
	try {
		const accessToken = await oauth2Client.getAccessToken();

		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				type: 'OAuth2',
				user: process.env.USER,
				// pass: process.env.PASS,
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
				accessToken: accessToken.token,
			},
			tls: {
				// do not fail on invalid certs
				rejectUnauthorized: false,
			},
		});
		
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: subject,
			html: html,
			attachments: [
				{
					filename: 'logo.jpg',
					// path: __dirname + '/logo.jpg',
					path: 'src/public/images/logo.jpg',
					cid: 'logo', //same cid value as in the html img src
				},
			],
		});
		console.log('Email sent successfully!!!');
	} catch (e) {
		console.log('Email not sent!!!', e);
	}
};
