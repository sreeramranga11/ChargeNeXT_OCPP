const express = require('express');
const request = require('request');
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

app.get('/api/stopCharging', (req, res) => {
  const session_id = '64a605d805968d5d64be612a'; // Retrieve session ID from command-line argument

  const options = {
    method: 'GET',
    url: `https://api.edrv.io/v1.1/sessions/${session_id}/stop`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  };

  request(options, function (error, response) {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      console.log(response.body);
      res.sendStatus(200);
    }
  });
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
