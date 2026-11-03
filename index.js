// Main Server Entry Point
// Sets up Express, middlewares, MongoDB connection, and starts the server.

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const vehicleRoutes = require('./routes/vehicle.route');

// 1. Load environment variables from .env
dotenv.config();

// 2. Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// 3. Middlewares
// Parse incoming JSON data in request body
app.use(express.json());

// Serve static frontend files (HTML and CSS) from the "public" folder
app.use(express.static('public'));

// 4. Mount Routes
// All vehicle API endpoints will start with /api/vehicles
app.use('/api/vehicles', vehicleRoutes);

// Optional health check route to verify server status
app.get('/api/health', function (req, res) {
    res.status(200).json({ status: 'Server is running' });
});

// 5. Connect to MongoDB Atlas and Start Server
mongoose
    .connect(MONGO_URI)
    .then(function () {
        console.log('Connected to MongoDB Atlas successfully.');
        app.listen(PORT, function () {
            console.log('Server is running on http://localhost:' + PORT);
        });
    })
    .catch(function (error) {
        console.error('MongoDB connection error:', error.message);
    });
