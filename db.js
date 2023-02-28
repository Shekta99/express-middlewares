const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "ejemplo";

const connect = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }
  return client.db(dbName);
};

const db = connect();

module.exports = db;
