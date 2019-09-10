const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); //add use schema before using it in ./services/passport.js
require('./services/passport'); //not assigned to a variable since we need this to run only once

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const path = require('path');
//Express will serve up production assets like main.css and main.js files
app.use(express.static(path.join(__dirname, 'client/build')));

//Express will serve up the index.html file if it does not recognize the route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT =  process.env.PORT || 5000;
app.listen(PORT);