const express = require('express');
const app = express();
const db = require('./Config/db')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);




// setting up session 
/// duration (expires after 3 hours)
 const MAX_AGE = 1000 * 60 * 60 * 3

/// mongodb session store
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions',
})

const sessionsetup = {
     secret: 'SECRET-KEY',
        store: store,
        cookie: {
            maxAge: MAX_AGE,    
            sameSite: false,
            secure: false, 
        },
        resave: false,
        saveUninitialized: false,
}


// connect to database 
db();


// pages rendering
app.set('view engine', 'ejs');

app.use(express.static(__dirname+'/UI'));
app.use(express.static(__dirname+'/UI/Style'));


// parse data
app.use(express.json());

app.use(express.urlencoded({extended: true}));


// session
app.use(session(sessionsetup));



// Define Routes 
app.use('/', require('./Routes/user.routes'))


// server 
app.listen(5000, (err) => {
    if (err) console.log(err)
    else console.log('Server is running on Port 5000')
});

