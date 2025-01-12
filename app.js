// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

const express = require('express');
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

require('./config/session.config')(app);

// default value for title local
const projectName = 'lab-express-basic-auth';
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const userSignin = require('./routes/auth.routes');
app.use('/auth', userSignin);

// app.get("*", (req, res, next) => {
//   if (req.session?.user) {
//     next();
//   } else {
//     res.redirect("/auth/login");
//   }
// });

const userRelated = require('./routes/user.routes');
app.use('/user', userRelated);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
