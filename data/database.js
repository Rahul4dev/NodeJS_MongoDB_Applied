const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient; // to est connection

let database;

async function connect() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017"); // how to est the connection
  // since connect method of MongoClient return a promise we have just placed this promise inside an async function in order to wait till it get execute. it also create multiple connections for the requests, i.e, connection pool.
  database = client.db("blog");
  // blog db created in mongodb_shell
}

function getDb() {
  if (!database) {
    throw { message: "Database connection not established!" };
  }
  return database;
}

module.exports = {
  connectToDatabase: connect,
  getDb: getDb,
};
