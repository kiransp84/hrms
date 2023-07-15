const { MongoClient } =  require("mongodb");

const getConnection = async ()=> {
	const connectionString = process.env.MONGODB_URI ;
	if( !connectionString ) {
		throw new Error(" A connection string is required to connect to mongodo ");
	}
	const client = new MongoClient(connectionString);
	try {
	  await client.connect();
	} catch(e) {
	  console.error(e);
	  throw new Error(" Error in connecting to Mongodo ")
	}
	client.addListener("open",()=> { console.log(" Open event "); });
	client.addListener("connectionCreated",()=> { console.log(" connectionCreated event "); });
	client.addListener("connectionClosed",()=> { console.log(" connectionClosed event "); });
	return client;
}

const getDB = (client) => {
	const DB_NAME=process.env.DB_NAME;
	const db = client.db(DB_NAME);
	return db;
}

//To-DO check best practices on closing a connection 
const closeConnection = async (client ) => {
	await client.close();
}

module.exports = {
	getConnection,
	closeConnection,
	getDB
};