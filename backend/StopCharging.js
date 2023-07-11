const request = require('request');
require('dotenv').config();

const session_id = '64a605d805968d5d64be612a'; // Retrieve session ID from command-line argument

const options = {
  method: 'GET',
  url: `https://api.edrv.io/v1.1/sessions/${session_id}/stop`,
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}` // Use API key from environment variable
  }
};

request(options, function (error, response) {
  if (error) throw new Error(error);

  console.log(response.body);
});
