const connect = require('./connect');
const mongoose = require('mongoose');

const initConnection = async () =>{
    await connect();
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("Connected successfully");
    });
}

const disconnectConnection = async () =>{
    const promise = await mongoose.connection.close();
    return promise;
}

module.exports = {
    initConnection,
    disconnectConnection
}