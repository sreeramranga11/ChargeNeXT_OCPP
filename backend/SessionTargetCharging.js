const readline = require('readline');
const request = require('request');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const CONNECTOR_ID = process.env.CONNECTOR_ID;
const USER_ID = process.env.USER_ID;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to start the charging session
function startChargingSession() {
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
    process.env.SESSION_ID = session_id; // Save session ID in environment variable

    // Prompt the user to enter the desired charging time in hours
    rl.question('Enter the desired charging time (in hours): ', (time) => {
      const desiredChargingTime = parseInt(time);

      // Calculate the stop time based on the desired charging duration
      const stopTime = new Date();
      stopTime.setHours(stopTime.getHours() + desiredChargingTime);

      // Set a timeout to stop the charging session at the calculated stop time
      const chargingTimer = setTimeout(function () {
        stopChargingSession(session_id);
        rl.close(); // Close the readline interface
      }, stopTime - new Date());

      // Display a message to the user
      console.log(`Charging session started. Charging will stop at ${stopTime}`);

      // Listen for user input to cancel the charging session
      rl.question('Press "C" and Enter to cancel the charging session: ', (input) => {
        if (input.toLowerCase() === 'c') {
          clearTimeout(chargingTimer); // Cancel the timeout
          stopChargingSession(session_id);
          console.log('Charging session canceled.');bg
        }
        rl.close(); // Close the readline interface
      });
    });
  });
}

// Function to stop the charging session
function stopChargingSession(sessionId) {
  const options = {
    method: 'GET',
    url: `https://api.edrv.io/v1.1/sessions/${sessionId}/stop`,
    headers: {
      Authorization: `Bearer ${API_KEY}` // Use API key from environment variable
    }
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);

    console.log(response.body);
  });
}

// Start the charging session
startChargingSession();
