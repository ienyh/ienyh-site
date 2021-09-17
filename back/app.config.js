/**
 * @module app.config 项目配置项
 * @author ienyh <https://github.com/ienyh>
 */
const argv = require('yargs');

/**
 * yargs 参数配置别名 
 * @param db_username 数据库用户名 输入 -u => --db_username
 * @param db_password 数据库用户密码 输入 -p => --db_password
 */
argv
	.alias('u', 'db_username')
	.alias('p', 'db_password');

const { db_username, db_password } = argv.argv;

exports.MONGODB_CONFIG = {
	url: `mongodb://${db_username}:${db_password}@1.117.43.137:27017/blogdb?authSource=admin`,
}

exports.SERVER_CONFIG = {
	ip: `127.0.0.1`
}