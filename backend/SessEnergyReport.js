const request = require('request');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const SESSION_ID = '64a20a91b0e6267924e60053';

const options = {
  method: 'GET',
  url: `https://api.edrv.io/v1.1/sessions/${SESSION_ID}/energy_reports`,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  const result = JSON.parse(body).result;
  console.log(result);
});
