const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/myDatabase1";

// Connect to MongoDB
mongoose.connect(mongoURL);

const db = mongoose.connection;

// Define event listeners for the database connection
db.on("connected", () => {
  console.log("Connected to the MongoDB server");
});

db.on("error", (err) => {
  console.error("MongoDB connection Error:", err); // Log error message
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Export the database connection
module.exports = db;

/*const mongoose = require("mongoose");
//require("dotenv").config();
//Define the mongoDB connection URF
// const mongoURL = "mongodb://localhost:27017/hotels";
//const mongoURL = "mongodb://127.0.0.1:27017/hotels";
const mongoURL =
  "mongodb+srv://ShubhamDev:Shubham1234@hotels.uwvrv.mongodb.net/"; //setup mongoDB connection
//Get the Default connection
//Mongoose maintains a default connection object representing the mongoDB connection
const db = mongoose.connection;
//define event listener for database connection
db.on("connected", () => {
  console.log("connected to the mongoDB server");
});
db.on("error", (err) => {
  console.log("MongoDB connection Error", err);
});
db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
//Export the database connection
module.exports = db;
*/
