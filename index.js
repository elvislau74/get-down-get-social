// call all necessary dependencies and files
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

// Port number
const PORT = process.env.PORT || 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = cwd.includes('Get-Down-Get-Social')
  ? cwd.split('Get-Down-Get-Social')[1]
  : cwd;

// Use all middleware and routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// run the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});