const config = require('../../config/config')
const mongoose = require('mongoose');

mongoose.connect(process.env.DB || config.db, { useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connectionn established successfully!");
})
connection.on('error', console.error.bind(console, 'connection error:'));
module.exports = mongoose