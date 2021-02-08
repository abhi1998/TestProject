const express = require('express'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
mongoose = require('mongoose'),
PORT = 3000 || process.env.PORT,
app = express();

// Mongoose Deprecations
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Database connection
mongoose.connect('mongodb://localhost:27017/test_project_new', {
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0 // If not connected, return errors immediately rather than waiting for reconnect
}) //Local
.then(console.log('Database Connected'))
.catch(err => console.log("Database error: "+err))

// Session

// Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Express-Config-Middlleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Requiring Routes
var routes = require('./routes/user')



// Routes Middleware
app.use('/', routes);


app.get('*', (req, res) => {
    res.sendStatus(404)
})

// Server
app.listen(PORT, () => {
    console.log(`Server started at Port: ${PORT}`)
})