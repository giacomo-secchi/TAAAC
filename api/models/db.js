const mongoose = require("mongoose");

let dbName = `comingsun`;
let dbURI = `mongodb://localhost:27017/${dbName}`;

if (process.env.NODE_ENV == "production") {
  dbURI = process.env.MONGODB_URI;
}
mongoose.connect(dbURI, { useNewUrlParser: true });

let db = mongoose.connection;

db.on("connected", () => console.log(`Mongoose connected to ${dbURI}`));
db.on("error", err => console.error(`Mongoose connection error: ${err}`));
db.on("disconnected", () => console.log(`Mongoose disconnected`));



let readLine = require("readline");
if (process.platform === "win32") {

  let rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on("SIGINT", function () {
    process.emit("SIGINT");
  });
}



// gracefully close moongose connection
let gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', () => gracefulShutdown(`nodemon restart`, () => process.kill(process.pid, 'SIGUSR2')));

// For app termination
process.on('SIGINT', () => gracefulShutdown(`app termination`, () => process.exit(0)));

// For Heroku app termination
process.on('SIGTERM', () => gracefulShutdown(`Heroku app termination`, () => process.exit(0)));




require('./projects'); 
require('./users');
