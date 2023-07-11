const request = require('request');
require('dotenv').config();

const stopCharging = (sessionID) => {
  const options = {
    method: 'GET',
    url: `https://api.edrv.io/v1.1/sessions/${sessionID}/stop`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  };

  request(options, function (error, response) {
    if (error) {
      console.error(error);
    } else {
      console.log(response.body);
    }
  });
};

module.exports = stopCharging;
