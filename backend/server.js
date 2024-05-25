// server.js
const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// Passport config
require('./config/passport')(passport);

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Express session
app.use(
  session({
    secret: '5648cd3345015d40d272cae88bf1a62937cabd492fc07469b4b743b82242ecf8',
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
