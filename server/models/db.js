var mongoose = require('mongoose');
var config = require('../config');
mongoose.Promise = require('bluebird');

config();

var mongoDB = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME; 

var db = mongoose.connection;

mongoose.connect(mongoDB).catch(error => handleError(error));

try {
  mongoose.connect(mongoDB);
  console.log("MongoDB is connected..."); 
} catch (error) {
  handleError(error);
  console.log(error);
}
