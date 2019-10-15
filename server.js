// libs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const app = express();
const fs = require('fs');
require('dotenv').config();

//db
const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/TenantsDB';
mongoose.connect(connectionString);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Middleware
//Uncomment for CORS config
// const whitelist = ['http://localhost:3000', 'https://lesnayagavan.ru'];
// const corsOptions = {
//   origin(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// app.use(cors(corsOptions));

//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(
  morgan('common', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' }),
  })
);
app.use(helmet());
app.use(express.json());
app.use('/assets', express.static('assets'));

// Routes
app.use(passport.initialize());
app.use(passport.session());

require('./Schemas/User');
require('./config/passport');
app.use(require('./Routes'));

// Don't stop server in production on error
process.on('uncaughtException', err => {
  console.log(err);
});

const server = app.listen(8080, () => {
  console.log(`Listening on port ${server.address().port}`);
});
