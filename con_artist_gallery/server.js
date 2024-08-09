## server.js
const express = require('express');
const Gallery = require('./client/src/components/Gallery.js');
const ArtworkDetail = require('./client/src/components/ArtworkDetail.js');
const CheckoutForm = require('./client/src/components/CheckoutForm.js');

class Server {
  constructor(app) {
    this.app = app;
    this.router = express.Router();
    this.gallery = new Gallery();
    this.artworkDetail = new ArtworkDetail();
    this.checkoutForm = new CheckoutForm();
  }

  // Initialize all the routes
  initRoutes() {
    this.app.use(express.json()); // Middleware to parse JSON bodies

    // Route to fetch all artworks
    this.router.get('/api/artworks', async (req, res) => {
      try {
        const artworks = await this.gallery.fetchArtworks();
        res.json(artworks);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Route to fetch a single artwork detail
    this.router.get('/api/artworks/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const artworkDetail = await this.artworkDetail.fetchArtworkDetail(id);
        res.json(artworkDetail);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Route to submit payment and confirm order
    this.router.post('/api/checkout', async (req, res) => {
      try {
        const paymentDetails = req.body.paymentDetails;
        const orderDetails = req.body.orderDetails;
        const paymentConfirmation = await this.checkoutForm.submitPayment(paymentDetails);
        const orderConfirmation = await this.checkoutForm.confirmOrder(orderDetails);
        res.json({ paymentConfirmation, orderConfirmation });
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    // Apply the routes to the app
    this.app.use(this.router);
  }
}

// Export the Server class to be used by other modules
module.exports = Server;

// Example usage:
// const expressApp = express();
// const server = new Server(expressApp);
// server.initRoutes();
