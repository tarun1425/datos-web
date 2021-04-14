const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/datos', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('Mongo Database Connected'))
    .catch((err) => console.log(err));

module.exports = mongoose;