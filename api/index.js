require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/auth', require('./controllers/auth.controller.js')(router));
app.use('/api/user', require('./controllers/user.controller.js')(router));
app.use('/api/workspace', require('./controllers/workspace.controller.js')(router));

app.listen(port, function() { console.log(`Listen to port ${port}`) });

module.exports = app;
