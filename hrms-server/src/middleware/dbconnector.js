const {getConnection,getDB} = require("../database/connect.js");

module.exports = async (req, res, next) => {
  const connection = await getConnection();
  req['mongoClient'] = connection;
  const db = await getDB(connection);
  req['mongodb'] = db;
  next()
}