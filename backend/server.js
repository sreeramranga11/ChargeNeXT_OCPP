const express = require('express');
const request = require('request');
const path = require('path');
const stopCharging = require('./StopCharging');
require('dotenv').config();
const app = express();

app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Define the routes
app.post('/api/startCharging', (req, res) => {
  const API_KEY = process.env.API_KEY;
  const CONNECTOR_ID = process.env.CONNECTOR_ID;
  const USER_ID = process.env.USER_ID;

  const options = {
    method: 'POST',
    url: 'https://api.edrv.io/v1.1/sessions',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    },
    body: {
      connector: CONNECTOR_ID,
      user: USER_ID
    },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      console.log(body);
      const session_id = body._id;
      process.env.SESSION_ID = session_id;
      res.sendStatus(200);
    }
  });
});

app.get('/api/stopCharging/:session_id', (req, res) => {
  const sessionID = req.params.session_id;

  if (!sessionID) {
    res.status(400).json({ error: 'Please provide a valid session ID.' });
    return;
  }

  stopCharging(sessionID);

  res.status(200).json({ message: 'Stop charging request sent.' });
});

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
