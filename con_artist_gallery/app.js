App.js
// Import necessary modules
const express = require('express');
const Server = require('./server.js');

class App {
  constructor() {
    this.app = express();
    this.server = new Server(this.app);
  }

  // Start the server on the specified port
  startServer(port = 3000) {
    this.server.initRoutes();
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

// Export the App class to be used by other modules
module.exports = App;

// Example usage:
// const appInstance = new App();
// appInstance.startServer();
