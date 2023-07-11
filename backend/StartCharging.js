const request = require('request');
require('dotenv').config();

const fs = require('fs'); // Import the 'fs' module

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
  if (error) throw new Error(error);

  console.log(body);
  const session_id = body._id; // Access the session ID from the response directly
  process.env.SESSION_ID = session_id;  // Save session ID in environment variable

  // Write SESSION_ID to .env file
  fs.appendFileSync('.env', `\nSESSION_ID=${session_id}`);
});
