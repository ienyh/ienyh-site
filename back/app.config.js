const { argv } = require('yargs');

exports.MONGODB_CONFIG = {
	url: `mongodb://1.117.43.137:${argv.dbport || "27017"}/blogdb`,
	username: argv.db_username || "db_username",
	password: argv.db_password || "db_password",
}