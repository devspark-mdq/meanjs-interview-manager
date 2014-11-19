'use strict';

module.exports = {
	db: 'mongodb://localhost/interview-manager-dev',
	app: {
		title: 'Interview Manager - Development Environment'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '84280043909-3bajapjn9a36gqvhrfbmlt28lihk1cnt.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'Vc0NhqfD2Nuufe4no_v7MoeK',
		callbackURL: '/auth/google/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
