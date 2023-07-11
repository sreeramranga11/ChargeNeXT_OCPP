// PowerLimit.js

// Function to determine the power limit based on the car and time of day
function determinePowerLimit(carType, currentTime) {
    let powerLimit = 0;
  
    // Check the car type and set the power limit accordingly
    switch (carType) {
      case 'electric':
        // Set power limit for electric cars
        powerLimit = 100; // Default power limit for electric cars
        break;
      case 'hybrid':
        // Set power limit for hybrid cars
        powerLimit = 50; // Default power limit for hybrid cars
        break;
    }
  
    // Adjust the power limit based on the time of day
    if (isPeakTime(currentTime)) {
      powerLimit -= 20; // Reduce power limit during peak hours
    } else {
      powerLimit += 10; // Increase power limit during off-peak hours
    }
  
    return powerLimit;
  }
  
  // Function to check if it is peak time
  function isPeakTime(currentTime) {
    // Assuming peak time is between 8 AM and 6 PM
    const peakStartTime = new Date().setHours(8, 0, 0); // Set peak start time to 8 AM
    const peakEndTime = new Date().setHours(18, 0, 0); // Set peak end time to 6 PM
  
    return currentTime >= peakStartTime && currentTime <= peakEndTime;
  }
  
  // Example usage
  const carType = 'electric'; // Assuming the car type is electric
  const currentTime = new Date().getTime(); // Get the current time
  
  const powerLimit = determinePowerLimit(carType, currentTime);
  console.log(`Power Limit: ${powerLimit} kW`);
  