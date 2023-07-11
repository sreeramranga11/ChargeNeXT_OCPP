document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');

  startButton.addEventListener('click', () => {
    // Send a POST request to startCharging endpoint
    fetch('/api/startCharging', {
      method: 'POST'
    })
      .then(response => {
        if (response.ok) {
          console.log('Charging started successfully!');
        } else {
          console.error('Failed to start charging.');
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  });

  stopButton.addEventListener('click', () => {
    const sessionID = prompt('Enter the session ID to stop charging:');
    if (!sessionID) return;
  
    // Send a GET request to the backend with the session ID
    fetch(`/api/stopCharging/${sessionID}`)
      .then(response => {
        if (response.ok) {
          console.log('Charging stopped successfully!');
        } else {
          console.error('Failed to stop charging.');
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  });  
});
