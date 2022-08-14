const mongoose = require('mongoose');
require ('dotenv').config({path:'./Config/.env'});


// database connection
const db = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('SUCCESSFULLY CONNECTED'))
    .catch((error) => console.log((error)));
}

module.exports = db;