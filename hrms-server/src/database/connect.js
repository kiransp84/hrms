require('../environment')();
const mongoose = require('mongoose');
//const connect = require('mongoose-connect-db');

module.exports = async () => {
	const connectionString = process.env.MONGODB_URI ;
	if(!connectionString) {
		throw new Error(' MONGODB_URI is missing .env file ');
	}
	const connection = await mongoose.connect(connectionString,{});
	return connection;
}